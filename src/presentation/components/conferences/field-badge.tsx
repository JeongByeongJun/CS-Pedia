import styles from "./conference-index.module.css";

export function FieldBadge({ field }: { field: string }) {
  return <span className={styles.fieldBadge}>{field}</span>;
}
