import { useZxing } from 'react-zxing';

type Props = {
  onScan: (value: string) => void;
};

export const Scanner = ({ onScan }: Props) => {
  const { ref } = useZxing({
    onDecodeResult(result) {
      onScan(result.getText());
    },
  });

  return (
    <div className="h-full">
      <video ref={ref} className="w-full h-full object-cover" />
    </div>
  );
};
