import { Flag } from "@/components/ui/Flag";
import { ST, STATUS_KEYS, type StatusKey } from "./data";
import styles from "./Status.module.css";

const CHIP: Record<StatusKey, string> = {
  native: styles.native,
  connector: styles.connector,
  custom: styles.custom,
  planned: styles.planned,
  assess: styles.assess,
};

const SWATCH: Record<StatusKey, string> = {
  native: styles.swNative,
  connector: styles.swConnector,
  custom: styles.swCustom,
  planned: styles.swPlanned,
  assess: styles.swAssess,
};

/** Status chip shown on directory cards (and, `large`, in the detail view). */
export function StatusChip({ status, large, id }: { status: StatusKey; large?: boolean; id?: string }) {
  const cls = [styles.chip, CHIP[status], large && styles.lg].filter(Boolean).join(" ");
  return (
    <span id={id} className={cls}>
      {ST[status]}
    </span>
  );
}

/** Key to the five status styles, plus the content-status flag. */
export function StatusLegend() {
  return (
    <div className={styles.legendWrap} data-reveal="1">
      <ul className={styles.legend} aria-label="Status legend">
        {STATUS_KEYS.map((k) => (
          <li key={k}>
            <span className={`${styles.sw} ${SWATCH[k]}`} aria-hidden="true" />
            {ST[k]}
          </li>
        ))}
      </ul>
      <Flag>Statuses to be updated as integrations are confirmed · logos omitted pending usage rights</Flag>
    </div>
  );
}
