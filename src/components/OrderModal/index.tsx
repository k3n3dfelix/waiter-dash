import closeIcon from '../../assets/images/close-icon.svg';
import imgFood from '../../assets/images/food.jpg';
import { Order } from '../../types/Order';
import { formatCurrency } from '../../utils/formatCurrency';

import { Overlay, ModalBody, OrderDetails, Actions} from "./styles";

interface OrderModalProps {
  visible: boolean;
  order: Order | null;
  onClose: () => void;
}
export function OrderModal({ visible, order, onClose }: OrderModalProps) {

  if(visible === false || !order){
    return null;
  }
  //Totalização com forEach
  // let total = 0;

  // order.products.forEach(({product,quantity}) => {
  //   total += product.price * quantity;
  // })

  //Totalização com Reduce

  const total = order.products.reduce((total, {product,quantity}) => {
    return total + (product.price * quantity)
  }, 0)

  console.log(total);
  return(
    <Overlay>
      <ModalBody>
        <header>
          <strong>Mesa {order.table}</strong>
          <button type="button" onClick={onClose}>
            <img src={closeIcon} alt="icone de fechar"/>
          </button>
        </header>

        <div className="status-container">
          <small>Status do pedido</small>
          <div>
            <span>
              {order.status === 'WAITING' && '🕑'}
              {order.status === 'IN_PRODUCTION' && '👩‍🍳'}
              {order.status === 'DONE' && '✅'}
            </span>
            <strong>
            {order.status === 'WAITING' && 'Fila de espera'}
              {order.status === 'IN_PRODUCTION' && 'Em Preparação'}
              {order.status === 'DONE' && 'Pronto!'}
            </strong>
          </div>
        </div>

        <OrderDetails>
          <strong>Itens</strong>
          <div className="order-items">
            {order.products.map(({_id, product,quantity}) => (
                  <div className="item">
                    <img 
                      src={imgFood}
                      alt={product.name}
                      width="48"
                      height="40"
                    />
                    <span className="quantity">{quantity} x</span>
                    <div className="product-details">
                      <strong>{product.name}</strong>
                      <span>{formatCurrency(product.price)}</span>
                    </div>
                  </div>
              ))}
          </div>
          <div className="total">
            <span>Total</span>
            <strong>{formatCurrency(total)}</strong>
          </div>
        </OrderDetails>
        <Actions>
          <button type="button" className="primary">
            <span>👩‍🍳</span>
            <strong>Iniciar Produção</strong>
          </button>
          <button type="button" className="secondary">
            <strong>Cancelar Pedido</strong>
          </button>
        </Actions>
      </ModalBody>
    </Overlay>
  );
}