import Button from "@/components/Button";
import usePaymentMethod from "./usePaymentMethods";
import ModalComponent from "@/components/Modal";
import { AddPaymentMethod, PaymentCard } from "@/components/PaymentMethods";
import { useTranslation } from "react-i18next";

const PaymentMethods = () => {
  const {
    paymentMethods,
    Elements,
    stripePromise,
    showModal,
    handleShowModal,
    handleCloseModal,
  } = usePaymentMethod();
  const {t} = useTranslation();
  return (
    <Elements stripe={stripePromise}>
      <section className="flex flex-col gap-2 w-full">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl xl:text-3xl font-semibold">{t('paymentCard')}</h2>
          <Button className="bg-green-700" onClick={handleShowModal}>
           {t('addNewCard')}
          </Button>
        </div>
        <div className="flex gap-4 flex-col">
          {paymentMethods?.data?.paymentMethods?.data?.map((pm) => (
            <PaymentCard
              key={pm.id}
              paymentMethod={pm}
              defaultPaymentMethod={
                paymentMethods?.data?.defaultPaymentMethod || ""
              }
            />
          ))}
        </div>
        <ModalComponent
          open={showModal}
          modalTitle="Add Payment Method"
          handleClose={handleCloseModal}
        >
          <AddPaymentMethod handleCloseModal={handleCloseModal} />
        </ModalComponent>
      </section>
    </Elements>
  );
};

export default PaymentMethods;
