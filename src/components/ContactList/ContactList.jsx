import { BtnDelete, ContactIt, Item, ListBox } from './ContactList.styled';
import PropTypes from 'prop-types';

export const ContactList = ({ contacts, onDelete }) => {
  return (
    <ListBox>
      <ul>
        {contacts.map(({ id, name, number }) => {
          return (
            <Item key={id}>
              <ContactIt>
                {name}: {number}
              </ContactIt>
              <BtnDelete type="button" onClick={() => onDelete(id)}>
                Delete
              </BtnDelete>
            </Item>
          );
        })}
      </ul>
    </ListBox>
  );
};

Event.propTypes = {
  contact: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      number: PropTypes.number,
    })
  ),

  onDelete: PropTypes.func,
};
