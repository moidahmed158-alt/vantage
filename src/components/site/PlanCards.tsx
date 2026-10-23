import { Btn } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { PLANS, type PlanItem } from "@/lib/plans";
import s from "./PlanCards.module.css";

function ItemList({ items }: { items: PlanItem[] }) {
  return (
    <ul className={s.list}>
      {items.map((item) => (
        <li key={item.text}>
          <span className={s.tick}>
            <Icon name="check" size={11} strokeWidth={3} />
          </span>
          <div>
            <span className={s.itemText}>{item.text}</span>
            {item.note && <span className={s.itemNote}>{item.note}</span>}
            {item.chips && (
              <span className={s.chips}>
                {item.chips.map((c) => (
                  <span key={c} className={s.chip}>
                    {c}
                  </span>
                ))}
              </span>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

/** The three plan cards. `idPrefix` keeps heading ids unique when several pages stay mounted. */
export function PlanCards({ idPrefix, headingLevel = 3 }: { idPrefix: string; headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as "h2" | "h3";
  return (
    <div className={s.grid} data-stagger>
      {PLANS.map((plan) => {
        const headingId = `${idPrefix}-${plan.id}`;
        return (
          <article
            key={plan.id}
            className={`v-plan ${plan.popular ? "v-plan--pop" : ""} ${s.card}`}
            aria-labelledby={headingId}
          >
            {plan.popular && (
              <span className="v-plan-badge">
                <span className="v-live" />
                Most popular
              </span>
            )}
            <header className={s.head}>
              <H id={headingId} className={s.tier}>
                {plan.tier}
              </H>
              <p className={s.tagline}>{plan.tagline}</p>
              <p className={`v-display ${s.headline}`}>{plan.headline}</p>
              <p className={s.note}>{plan.note}</p>
            </header>

            <div className={s.groups}>
              {plan.groups.map((group) => (
                <div key={group.title} className={s.group}>
                  <p className={s.groupTitle}>{group.title}</p>
                  <ItemList items={group.items} />
                </div>
              ))}
              <div className={s.highlight}>
                <p className={s.hlTitle}>
                  <span className="v-live" />
                  {plan.highlight.title}
                </p>
                <ItemList items={plan.highlight.items} />
              </div>
            </div>

            <Btn href={plan.cta.href} variant={plan.popular ? "primary" : "ghost"} arrow className={s.cta}>
              {plan.cta.label}
            </Btn>
          </article>
        );
      })}
    </div>
  );
}
