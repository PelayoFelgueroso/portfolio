import styles from "../../../style.module.scss";

interface Props {
  children: string;
}

export const LanguageJsx = ({ children }: Props) => {
  return <code className={styles.languaje_jsx}>{children}</code>;
};
