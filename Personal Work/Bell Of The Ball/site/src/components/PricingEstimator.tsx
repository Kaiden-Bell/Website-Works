/*
 * Ported from components/pricing-section.txt (a Framer canvas component).
 *
 * What was dropped:
 *  - Every `framer` import. `addPropertyControls`, `ControlType`,
 *    `useIsStaticRenderer`, and Framer's `Link` exist only inside the Framer
 *    canvas. The property-control defaults became src/data/pricing.ts.
 *  - `framer-motion`. Enter/exit animation is CSS on --ease-organic instead,
 *    so no animation library ships.
 *  - The colour/radius/font props. Those are design-system decisions and now
 *    resolve through the Botanical Ledger tokens in CSS, not per-instance
 *    props. Radius in particular is zero by system rule.
 *  - The ResizeObserver + isNarrow branch. A CSS media query does the same
 *    two-column-to-single-column job without JS or a hydration mismatch.
 *
 * What was fixed on the way through:
 *  - The source's add-on buttons had BOTH onClick and an onKeyDown for
 *    Enter/Space. A <button> already fires click on both keys, so every
 *    keyboard toggle fired twice and cancelled itself out.
 *  - The dropdown had no keyboard support, no Escape, and no outside-click
 *    close. It now has all three plus roving arrow-key focus.
 *  - Intl.NumberFormat(undefined) resolves to the server's locale during SSR
 *    and the visitor's in the browser, which can mismatch on hydration. Pinned
 *    to en-US.
 *
 * Options may declare `requires` (see src/data/pricing.ts). Such a row is
 * hidden until one of the options it names is selected, and de-selects itself
 * if that prerequisite is later removed — so an estimate can never carry extra
 * machine supplies with no machine under them.
 */
import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import {
  CURRENCY,
  EVENT_TYPES,
  PRICING_IS_PLACEHOLDER,
  type EventType,
  type PricingOption,
} from '../data/pricing';

interface Props {
  ctaHref?: string;
  ctaLabel?: string;
  showPlaceholderNotice?: boolean;
  /*
   * Whether the estimator closes on its own "Book Consultation" button.
   *
   * On /pricing it does not. A booking CTA directly under the total is an exit
   * ramp offered at the exact moment a visitor has just produced a number they
   * have questions about — deposits, lead time, what the base actually covers.
   * Nearly all of them stopped there, and the fifteen answers written for them
   * sat several screens below, unread. That page hands the next step to the FAQ
   * signpost instead and keeps its booking CTA for the bottom of the page,
   * after the questions have been answered.
   *
   * Defaults to true so the estimator still stands alone anywhere else.
   */
  showCta?: boolean;
}

const formatter = new Intl.NumberFormat('en-US');
const formatPrice = (value: number) => `${CURRENCY}${formatter.format(value)}`;

const keyFor = (eventName: string, optionName: string) => `${eventName}::${optionName}`;

/** An option with no `requires`, or one whose prerequisites are satisfied. */
const isUnlocked = (event: EventType, option: PricingOption, keys: string[]) =>
  !option.requires?.length ||
  option.requires.some((name) => keys.includes(keyFor(event.name, name)));

export default function PricingEstimator({
  ctaHref = '/contact',
  ctaLabel = 'Book Consultation',
  showPlaceholderNotice = false,
  showCta = true,
}: Props) {
  const [isOpen, setOpen] = useState(false);
  const [selectedName, setSelectedName] = useState<string>('');
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const listboxId = useId();

  const selectedEvent: EventType | null = useMemo(
    () => EVENT_TYPES.find((e) => e.name === selectedName) ?? null,
    [selectedName]
  );

  // Rows offered for the current event: the unconditional ones, plus any whose
  // prerequisite is currently selected.
  const availableOptions = useMemo(() => {
    if (!selectedEvent) return [];
    return selectedEvent.options.filter((o) => isUnlocked(selectedEvent, o, selectedKeys));
  }, [selectedEvent, selectedKeys]);

  const selectedOptions = useMemo(() => {
    if (!selectedEvent) return [];
    return availableOptions.filter((o) =>
      selectedKeys.includes(keyFor(selectedEvent.name, o.name))
    );
  }, [selectedEvent, availableOptions, selectedKeys]);

  const total = useMemo(() => {
    if (!selectedEvent) return 0;
    return selectedEvent.basePrice + selectedOptions.reduce(
      // A rate row's price is per guest or per hour, and we don't know how
      // many of either. Counting it once would read as the whole charge.
      (sum, o) => sum + (o.rate ? 0 : o.price ?? 0),
      0
    );
  }, [selectedEvent, selectedOptions]);

  // The client scopes most work per event, and some add-ons are quoted rather
  // than fixed, so the figure is a floor — never presented as an exact price.
  // Rate rows count here too: they carry a real number that the total can't
  // include, and the visitor needs telling why.
  const hasUncountedSelection = useMemo(
    () => selectedOptions.some((o) => o.price === null || o.rate),
    [selectedOptions]
  );

  const closeAndRefocus = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  const selectEvent = useCallback(
    (name: string) => {
      setSelectedName(name);
      setSelectedKeys([]);
      closeAndRefocus();
    },
    [closeAndRefocus]
  );

  const toggleOption = useCallback(
    (optionName: string) => {
      if (!selectedEvent) return;
      const key = keyFor(selectedEvent.name, optionName);
      setSelectedKeys((prev) => {
        const next = prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key];
        // Removing a machine must also remove the supplies bought for it,
        // rather than leaving a checked row that has just been hidden.
        return next.filter((k) => {
          const option = selectedEvent.options.find(
            (o) => keyFor(selectedEvent.name, o.name) === k
          );
          return !option || isUnlocked(selectedEvent, option, next);
        });
      });
    },
    [selectedEvent]
  );

  // Close on outside click / Escape.
  useEffect(() => {
    if (!isOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeAndRefocus();
      }
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, closeAndRefocus]);

  // Move DOM focus to follow the roving active option.
  useEffect(() => {
    if (!isOpen) return;
    const options = listRef.current?.querySelectorAll<HTMLButtonElement>('[role="option"]');
    options?.[activeIndex]?.focus();
  }, [isOpen, activeIndex]);

  const openAt = (index: number) => {
    setActiveIndex(index);
    setOpen(true);
  };

  const onTriggerKeyDown = (event: React.KeyboardEvent) => {
    const currentIndex = Math.max(0, EVENT_TYPES.findIndex((e) => e.name === selectedName));
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openAt(currentIndex);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      openAt(EVENT_TYPES.length - 1);
    }
  };

  const onListKeyDown = (event: React.KeyboardEvent) => {
    const last = EVENT_TYPES.length - 1;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((i) => (i >= last ? 0 : i + 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((i) => (i <= 0 ? last : i - 1));
    } else if (event.key === 'Home') {
      event.preventDefault();
      setActiveIndex(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      setActiveIndex(last);
    } else if (event.key === 'Tab') {
      setOpen(false);
    }
  };

  return (
    <div className="pricing-estimator">
      {showPlaceholderNotice && PRICING_IS_PLACEHOLDER && (
        <p className="placeholder-banner">
          TODO(client) — the balloon arch and diaper cake figures still come from the guide rather than
          from the client. Confirm them and flip PRICING_IS_PLACEHOLDER in src/data/pricing.ts. This
          banner is dev-only and will not appear in a production build.
        </p>
      )}

      <div className="pe-field" ref={wrapRef}>
        <span className="label-text" id={`${listboxId}-label`}>
          What are you planning?
        </span>

        <div className="pe-select-wrap">
          <button
            type="button"
            ref={triggerRef}
            className="pe-select shape-14"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-controls={isOpen ? listboxId : undefined}
            aria-labelledby={`${listboxId}-label`}
            onClick={() => (isOpen ? setOpen(false) : openAt(
              Math.max(0, EVENT_TYPES.findIndex((e) => e.name === selectedName))
            ))}
            onKeyDown={onTriggerKeyDown}
          >
            <span>{selectedName || 'Choose an event type'}</span>
            <span className="pe-select-caret" aria-hidden="true">{isOpen ? '—' : '+'}</span>
          </button>

          {isOpen && (
            <div
              className="pe-listbox"
              id={listboxId}
              role="listbox"
              ref={listRef}
              aria-labelledby={`${listboxId}-label`}
              onKeyDown={onListKeyDown}
            >
              {EVENT_TYPES.map((eventType, i) => (
                <button
                  key={eventType.name}
                  type="button"
                  role="option"
                  tabIndex={i === activeIndex ? 0 : -1}
                  aria-selected={selectedName === eventType.name}
                  className={`pe-option${i === activeIndex ? ' is-active' : ''}`}
                  onClick={() => selectEvent(eventType.name)}
                >
                  {eventType.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="pe-body">
        <div className="pe-pane pe-pane-addons">
          <span className="label-text">Add-ons</span>

          {!selectedEvent ? (
            <p className="pe-empty">Choose an event type to see what can be added.</p>
          ) : (
            <div className="pe-addons">
              {availableOptions.map((option, i) => {
                const key = keyFor(selectedEvent.name, option.name);
                const checked = selectedKeys.includes(key);
                return (
                  <button
                    key={key}
                    type="button"
                    role="checkbox"
                    aria-checked={checked}
                    className="pe-addon"
                    style={{ ['--pe-delay' as string]: `${i * 0.045}s` }}
                    onClick={() => toggleOption(option.name)}
                  >
                    <span className="pe-addon-label">
                      <span className="pe-check" aria-hidden="true">{checked ? '✓' : ''}</span>
                      <span>
                        {option.name}
                        {option.note && <span className="pe-addon-note">{option.note}</span>}
                      </span>
                    </span>
                    <span className="pe-price">
                      {option.price === null ? (
                        <em className="pe-varies">Varies</em>
                      ) : (
                        <>
                          {formatPrice(option.price)}
                          {option.unit && <span className="pe-unit"> {option.unit}</span>}
                        </>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="pe-pane-right">
          <div className="pe-pane">
            <span className="label-text">Estimate breakdown</span>

            {!selectedEvent ? (
              <p className="pe-empty">Choose an event type to preview pricing.</p>
            ) : (
              <div className="pe-lines" aria-live="polite">
                <div className="pe-line" key={`${selectedEvent.name}-base`}>
                  <span className="pe-line-label">
                    {selectedEvent.name} — base
                    <span className="pe-line-sub">{selectedEvent.includes}</span>
                  </span>
                  <span className="pe-line-value">{formatPrice(selectedEvent.basePrice)}</span>
                </div>

                {selectedOptions.map((option) => (
                  <div className="pe-line" key={`${selectedEvent.name}-${option.name}`}>
                    <span className="pe-line-label">
                      {option.name}
                      {option.unit ? (
                        <span className="pe-line-sub">Charged {option.unit}</span>
                      ) : (
                        option.note && <span className="pe-line-sub">{option.note}</span>
                      )}
                    </span>
                    <span className="pe-line-value">
                      {option.price === null ? (
                        <em className="pe-varies">Quoted per event</em>
                      ) : option.rate ? (
                        <em className="pe-varies">
                          {formatPrice(option.price)} {option.unit}
                        </em>
                      ) : (
                        formatPrice(option.price)
                      )}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pe-total shape-18">
            <span className="label-text">Estimated total</span>
            <p className="pe-total-figure">
              <span className="pe-from">From</span> {formatPrice(total)}
            </p>
            <p className="pe-total-note">
              {hasUncountedSelection
                ? 'Starting figure only — anything quoted per event, or charged by the guest or the hour, is listed above but not counted here. Your real number comes out of the consultation.'
                : 'A starting figure, not a quote. Most work is scoped per event; your real number comes out of the consultation.'}
            </p>
          </div>
        </div>
      </div>

      {showCta && (
        <a className="cta-btn" href={ctaHref}>
          {ctaLabel}
        </a>
      )}
    </div>
  );
}
