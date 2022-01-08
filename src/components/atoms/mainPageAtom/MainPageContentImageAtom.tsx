import Image from 'next/image';

type Props = {
  image?: string;
  className?: string;
};

export const MainPageContentImageAtom: React.FC<Props> = ({
  image,
  className,
}) => {
  return (
    <div className={`px-2 py-2 my-auto ${className}`}>
      {image !== 'none' ? (
        <Image
          src={image!}
          //   layout={'fill'}
          //   objectFit={'contain'}
          alt='img'
          width={500}
          height={500}
        />
      ) : (
        <p>none</p>
      )}
    </div>
  );
};
