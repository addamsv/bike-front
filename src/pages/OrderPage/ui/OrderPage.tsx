import { classes } from "resources/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { memo, useCallback, useEffect } from "react";
import { Page } from "widgets/Page/Page";
import { useParams, useSearchParams } from "react-router-dom";
import { Card } from "shared/Card/Card";
import { VFlex } from "shared/Flex/VFlex";
import cls from "./OrderPage.module.scss";
import { useAppDispatch } from "resources/hooks/useAppDispatch";
import { fetchOrderByID } from "../model/services/fetchOrderByID";
import { getOrderData, getOrderError, getOrderIsLoading } from "../model/selectors";
import { useSelector } from "react-redux";
import { AsyncModule, ReducerListT } from "shared/AsyncModule/AsyncModule";
import { orderActions, orderReducer } from "../model/slices/orderSlice";
import { CImg } from "shared/CImg";
import { Skeleton } from "shared/Skeleton/Skeleton";
import { AppLink } from "shared/AppLink/AppLink";
import { RoutePath } from "resources/router/routeConfig/routeConfig";
import { Button, ButtonTheme } from "shared/Button/Button";

interface IOrderPageProps {
  className?: string;
}

const reducers: ReducerListT = {
  orderPage: orderReducer
};

const OrderPage = memo(({ className }: IOrderPageProps) => {
  const { t } = useTranslation();

  const { id } = useParams<{ id: string }>();

  const isPageEdit = Boolean(id);

  const isLoading = useSelector(getOrderIsLoading);
  const error = useSelector(getOrderError);
  const data = useSelector(getOrderData);

  const dispatch = useAppDispatch();

  const onClickHandler = useCallback((id: string) => {
    dispatch(orderActions.sendOrder(id));
  }, [dispatch]);

  useEffect(() => {
    if (__PROJECT_TYPE__ !== "storybook" && __PROJECT_TYPE__ !== "jest") {
      dispatch(fetchOrderByID({ orderId: Number(id) }));
    }
  }, [dispatch, id]);

  let content;

  if (isLoading) {
    content = 'Loading';
  } else if (error) {
    content = "ошибка";
  } else {
    console.log("data:");
    console.log(data);
    content = (
      <>
        <CImg
          className={cls.bookImage}
          src={`${__REST_API__BASE_URL__ + '/' + data?.img}`}
          alt="*"
          fallback={<Skeleton className={cls.bookImage} />}
        />
        <p> {data?.currency || "no currency"}</p>
        <p> {data?.price || "no price"}</p>
        <p> {data?.Title || "no brand"}</p>
        <p> {data?.id || "no id"}</p>

        <AppLink
          title={`${t("добавить в корзину")} ${data?.Title}`}
          to={`${RoutePath.order}${data?.id}`}
        >
          <Button
            className={cls.downloadBtnWrap}
            theme={ButtonTheme.GREEN}
            onClick={() => onClickHandler(String(data?.id))}
          >
            {t("send order")}
          </Button>
        </AppLink>
      </>)
  }

  return (

    <AsyncModule reducers={reducers} isRemoveAfterUnmount>
      <Page className={classes(cls.OrderPage, {}, [className])}>
        <Card className={cls.wrapper}>
          <VFlex gap="8">
            <h1>{t("Order PAGE")}</h1>
            {content}
          </VFlex>
        </Card>
      </Page>

    </AsyncModule>
  );
});

export default OrderPage;
