import { ST, type StatusKey } from "./data";
import styles from "./Status.module.css";

const CHIP: Record<StatusKey, string> = {
  native: styles.native,
  connector: styles.connector,
  custom: styles.custom,
  planned: styles.planned,
  assess: styles.assess,
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
