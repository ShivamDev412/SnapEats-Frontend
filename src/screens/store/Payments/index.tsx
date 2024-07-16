import { AddNewAccount } from "@/components/BankAccount";
import ModalComponent from "@/components/Modal";
import usePayments from "./usePayments";
import Button from "@/components/Button";
import { BsBank2 } from "react-icons/bs";

const Payments = () => {
  const {
    modal,
    handleOpenModal,
    handleCloseModal,
    backAccount,
    isFetching,
    handleUnlinkAccount,
  } = usePayments();
  if (isFetching) return <p>Loading...</p>;
  return (
    <>
      <section>
        <h2 className="text-3xl font-semibold">Payments</h2>
      </section>
      <section className="bg-zinc-800 rounded-lg p-4 my-6 w-9/12">
        <h3 className="text-2xl font-semibold">Bank Account</h3>
        {backAccount?.data ? (
          <>
            <div className="flex items-center gap-2 bg-zinc-600 rounded-lg p-4 my-4 w-fit">
              <BsBank2 className="h-6 w-6" />{" "}
              <p className="text-lg">
                {backAccount?.data?.individual.first_name}{" "}
                {backAccount?.data?.individual.last_name} ****
                {backAccount?.data?.external_accounts.data[0].last4}
              </p>
            </div>
            <Button
              className="text-[1rem] my-4 text-sm"
              onClick={handleUnlinkAccount}
            >
              Unlink Bank Account
            </Button>
          </>
        ) : (
          <Button className="text-[1rem] my-4" onClick={handleOpenModal}>
            Link Bank Account
          </Button>
        )}
      </section>
      <ModalComponent
        open={modal}
        handleClose={handleCloseModal}
        modalTitle="add-bank-account"
      >
        <AddNewAccount handleCloseModal={handleCloseModal} />
      </ModalComponent>
    </>
  );
};

export default Payments;
