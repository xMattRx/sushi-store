type Props = {
  step: number;
};

const CheckoutProgressBar = ({ step }: Props) => {
  const percentage = (step / 3) * 100;

  return (
    <div className="w-full bg-gray-200 h-2 rounded overflow-hidden mb-6 mt-2">
      <div
        className="bg-gray-800 h-full transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default CheckoutProgressBar;
