import { Counter } from "entities/Counter";
import { useTranslation } from "react-i18next";
import { Card } from "shared/Card/Card";
import { VFlex } from "shared/Flex/VFlex";
import { Page } from "widgets/Page/Page";
import cls from "./AdminPage.module.scss";
import { classes } from "resources/lib/classNames/classes";
import { memo } from "react";

interface IAdminPageProps {
  className?: string;
}

const AdminPage = memo(({ className }: IAdminPageProps) => {
  const { t } = useTranslation();

  return (
    <Page className={classes(cls.AdminPage, {}, [className])}>
      <Card className={cls.wrapper}>
        <VFlex gap="8">
          <h1>{t("админка")}</h1>
        </VFlex>
      </Card>
    </Page>
  );
});

export default AdminPage;
