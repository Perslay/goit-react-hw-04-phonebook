import PropTypes from 'prop-types';
import css from '../styles/ContactForm.module.css';

export const ContactForm = ({
  add,
  nameInputId,
  numberInputId,
  handleName,
  handleNumber,
}) => {
  return (
    <form className={css.form} onSubmit={add}>
      <div className={css.formBox}>
        <label className={css.label} htmlFor={nameInputId}>
          Name
        </label>
        <input
          onChange={handleName}
          className={css.input}
          type="text"
          name="name"
          id={nameInputId}
          pattern="^[a-zA-Zа-яА-Я]+((['\s\-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </div>
      <div className={css.formBox}>
        <label className={css.label} htmlFor={numberInputId}>
          Number
        </label>
        <input
          onChange={handleNumber}
          className={css.input}
          type="tel"
          name="number"
          id={numberInputId}
          pattern="^\+((?:9[679]|8[035789]|6[789]|5[90]|42|3[578]|2[1-689])|9[0-58]|8[1246]|6[0-6]|5[1-8]|4[013-9]|3[0-469]|2[70]|7|1)(?:\W*\d){0,13}\d$"
          title="Phone number must start with +, be at least 3 digits and can contain spaces, dashes"
          required
        />
      </div>
      <button className={css.button} type="submit">
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  add: PropTypes.func.isRequired,
  nameInputId: PropTypes.string.isRequired,
  numberInputId: PropTypes.string.isRequired,
  handleName: PropTypes.func.isRequired,
  handleNumber: PropTypes.func.isRequired,
};
