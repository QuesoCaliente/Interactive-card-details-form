import Image from "next/image";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { formatCreditCard } from "../utils/creditFormat";

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    card_number: "",
    expiry_date: "",
    expiry_year: "",
    cvc: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    card_number: "",
    expiry_date: "",
    expiry_year: "",
    cvc: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleError = (name: string, value: string) => {
    if (value.length === 0) {
      setErrors({
        ...errors,
        [name]: `${name} is required`,
      });
    } else {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
    if (name === "card_number" && (value.length < 16 || value.length > 16)) {
      setErrors({
        ...errors,
        [name]: "this field must be 16 characters long",
      });
    }
    if (name === "expiry_date" && (value.length < 5 || value.length > 5)) {
      setErrors({
        ...errors,
        [name]: "this field must be 5 characters long",
      });
    }
    if (name === "expiry_year" && (value.length < 2 || value.length > 2)) {
      setErrors({
        ...errors,
        [name]: "this field must be 2 characters long",
      });
    }
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      errors.name === "" &&
      errors.card_number === "" &&
      errors.expiry_date === "" &&
      errors.expiry_year === "" &&
      errors.cvc === "" &&
      form.name !== "" &&
      form.card_number !== "" &&
      form.expiry_date !== "" &&
      form.expiry_year !== "" &&
      form.cvc !== ""
    ) {
      setIsSubmitting(true);
      setForm({
        name: "",
        card_number: "",
        expiry_date: "",
        expiry_year: "",
        cvc: "",
      });
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <main className="flex min-h-screen flex-col lg:flex-row">
      <div className="relative h-[300px] w-full bg-[url('/images/bg-main-desktop.png')] bg-cover bg-no-repeat md:block lg:h-screen  lg:w-1/3">
        {/* FrontCard */}
        <div className="lg:left-30 absolute -bottom-9 left-5 z-10 h-[150px] w-[300px]  bg-[url('/images/bg-card-front.png')] bg-cover  lg:top-1/4 lg:block">
          {/* First WhiteCircle */}
          <div className="absolute top-2 left-4 h-8 w-8 rounded-full bg-white"></div>
          {/* Second  WhiteCircle */}
          <div className="absolute top-3 left-14 h-5 w-5 rounded-full border-2 border-white"></div>
          {/* Number Card */}
          <span className="absolute bottom-10 left-5 text-white">
            {formatCreditCard(form.card_number) || "0000 0000 0000 0000"}
          </span>
          {/* Card Name */}
          <span className="absolute bottom-3 left-5 text-xs text-white">
            {form.name || "FULL NAME"}
          </span>
          <span className="absolute bottom-3 right-5 text-xs text-white">
            {new Date(form.expiry_date).getMonth() || "MM"} /{" "}
            {form.expiry_year || "YY"}
          </span>
        </div>
        {/* BackCard */}
        <div className=" absolute bottom-12 right-2 h-[150px] w-[300px] bg-[url('/images/bg-card-back.png')]  bg-cover lg:top-[45%]  lg:left-32 lg:block">
          <span className="absolute top-[4.5rem] right-10 text-xs text-white">
            {form.cvc || 123}
          </span>
        </div>
      </div>
      <div className="flex w-full items-center justify-center">
        {isSubmitting ? (
          <SubmitPage setIsSubmitting={setIsSubmitting} />
        ) : (
          <form
            onSubmit={handleSubmit}
            className=" z-10 mt-14 flex w-full max-w-[600px] flex-col gap-5  px-5 lg:mt-0"
          >
            {/* Input Group CARDHOLDER NAME */}
            <div className="flex flex-col">
              <label className="text-xs md:text-lg" htmlFor="name">
                CARDHOLDER NAME
              </label>
              <input
                // required
                name="name"
                onBlur={(e) => handleError(e.target.name, e.target.value)}
                onChange={onChange}
                value={form.name}
                autoComplete="off"
                className="rounded-md border-2 border-gray-400 p-2 outline-none"
                placeholder="e.g.Jane Applessed"
                type="text"
                id="name"
              />
              {errors.name !== "" && (
                <span className="text-xs text-red-500">{errors.name}</span>
              )}
            </div>
            {/* Input Group CARD NUMBER */}
            <div className="flex flex-col">
              <label className="text-xs md:text-lg" htmlFor="cardnumber">
                CARD NUMBER
              </label>
              <input
                // required
                maxLength={16}
                minLength={16}
                onBlur={(e) => {
                  setForm({
                    ...form,
                    card_number: formatCreditCard(e.target.value),
                  });
                  handleError(e.target.name, e.target.value);
                }}
                name="card_number"
                onChange={onChange}
                value={form.card_number}
                autoComplete="off"
                className="rounded-md border-2 border-gray-400 p-2 outline-none"
                placeholder="e.g. 1234 5678 9012 3456"
                type="text"
                id="cardnumber"
              />
              {errors.card_number && (
                <span className="text-xs text-red-500">
                  {errors.card_number}
                </span>
              )}
            </div>
            {/* Input Group EXPIRY DATE And CVC*/}
            <div className="flex flex-row items-center gap-1 md:justify-center md:gap-5">
              <div className="flex  flex-col">
                <label className="text-xs md:text-lg" htmlFor="expirydate">
                  EXPIRY DATE
                </label>
                <div className="flex flex-row  gap-1 md:gap-5 ">
                  <input
                    // required
                    onBlur={(e) => handleError(e.target.name, e.target.value)}
                    type="textl"
                    name="expiry_date"
                    onChange={onChange}
                    value={form.expiry_date}
                    autoComplete="off"
                    className="w-1/2  rounded-md border-2 border-gray-400 p-2 outline-none"
                    placeholder="e.g. 01/23"
                    id="expirydate"
                  />
                  <input
                    // required
                    onBlur={(e) => handleError(e.target.name, e.target.value)}
                    name="expiry_year"
                    onChange={onChange}
                    value={form.expiry_year}
                    autoComplete="off"
                    className="w-1/2 rounded-md border-2 border-gray-400 p-2 outline-none"
                    placeholder="YYYY"
                    type="text"
                    id="expiryyear"
                  />
                </div>
                {errors.expiry_date && (
                  <span className="text-xs text-red-500">
                    {errors.expiry_date}
                  </span>
                )}
                {errors.expiry_year && (
                  <span className="text-xs text-red-500">
                    {errors.expiry_year}
                  </span>
                )}
              </div>
              <div className="flex  flex-col">
                <label className="text-xs md:text-lg" htmlFor="cvc">
                  CVC
                </label>
                <input
                  // required
                  onBlur={(e) => handleError(e.target.name, e.target.value)}
                  onChange={onChange}
                  name={"cvc"}
                  minLength={3}
                  maxLength={3}
                  autoComplete="off"
                  className="rounded-md border-2 border-gray-400 p-2 outline-none"
                  placeholder="e.g. 123"
                  type="text"
                  id="cvc"
                />
                {errors.cvc && (
                  <span className="text-xs text-red-500">{errors.cvc}</span>
                )}
              </div>
            </div>
            <button
              className="  border-none bg-neutral-very-dark-violet py-2 text-white"
              type="submit"
            >
              Confirm
            </button>
          </form>
        )}
      </div>
    </main>
  );
}

const SubmitPage = ({
  setIsSubmitting,
}: {
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <section className=" mt-10 flex flex-col items-center justify-center md:mt-0">
      <Image
        width={100}
        height={100}
        alt="icon complete"
        src="/images/icon-complete.svg"
      />
      <h2 className="text-neutral-dark-violet mt-5 text-2xl font-bold tracking-widest">
        THANK YOU!
      </h2>
      <p className="mt-5 text-sm font-medium tracking-widest text-gray-500">
        We´ve added your card details
      </p>
      <button
        onClick={() => setIsSubmitting(false)}
        className="mt-5 w-full border-none bg-neutral-very-dark-violet py-2 text-white"
        type="submit"
      >
        Continue
      </button>
    </section>
  );
};
