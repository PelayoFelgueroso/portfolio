import Image from "next/image";
import styles from "../style.module.scss";
import { externalArrow, logoTransparent, menuGradient } from "@/public";
import Link from "next/link";
import { externalLinks, navLinks } from "@/content";

export const Menu = () => {
  return (
    <>
      <div className={styles.nav_body}>
        <div className={styles.internal_links}>
          <ul className={styles.navLinks}>
            {navLinks.map((link, i) => (
              <li key={i}>
                <Link href={link.href} className={styles.menu_item}>
                  <div className={styles.menu_item_container}>
                    <div className={styles.menu_item_text}>{link.title}</div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.external_links}>
          <ul className={styles.externalLinks}>
            {externalLinks.map((link, i) => (
              <li key={i}>
                <Link href={link.href} className={styles.menu_item}>
                  <div className={styles.menu_item_container}>
                    <div className={styles.menu_item_text}>{link.title}</div>
                    <div className={styles.external_arrow}>
                      <Image
                        src={externalArrow}
                        alt=""
                        className={styles.arrow}
                      />
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.nav_footer}>
        <div className={styles.footer_container}>
          <div className={styles.gradient_container}>
            <Image src={menuGradient} alt="" className={styles.gradient} />
          </div>

          <div className={styles.logo_gradient_container}>
            <Image src={logoTransparent} alt="Logo" className={styles.logo} />
          </div>
        </div>
      </div>
    </>
  );
};
