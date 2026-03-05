import type { FC } from 'react';
import { useEffect } from 'react';
import { viewProductGrpc } from '../../api/GrpcClient';
import { viewProduct } from '../../api/httpClient';
import type { Product } from '../../interfaces/Product';

interface Props {
  product: Product;
  onImageLoad?: () => void;
}

const init = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).jQuery('.venobox').venobox();
};

export const ProductView: FC<Props> = (props: Props) => {
  useEffect(() => {
    init();
  }, []);

  return (
    <div
      className={`col-lg-4 col-md-6 portfolio-item filter-${props.product.category}`}
      style={{ zIndex: 0 }}
      key={props.product.name}
    >
      <div className="portfolio-wrap">
        <img
          src={props.product.photoUrl}
          className="img-fluid"
          alt={`Image of ${props.product.name}`}
          onLoad={() => {
            props.onImageLoad?.();
            viewProduct(props.product.name);
          }}
          onClick={() => {
            console.log('Product clicked:', props.product.name);
            viewProductGrpc(props.product.name);
          }}
          style={{ cursor: 'pointer' }}
          title="Click to trigger gRPC view count"
        />
        <div className="portfolio-info">
          <h4>{props.product.name}</h4>
          <p>{props.product.description}</p>
        </div>
        <div className="portfolio-links">
          <a
            href={props.product.photoUrl}
            data-gall="portfolioGallery"
            className="venobox"
            title={props.product.name}
          >
            <i className="bx bx-plus" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
