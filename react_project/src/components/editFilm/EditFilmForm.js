import React from 'react'
import { reduxForm, Field } from 'redux-form';
import withTranslation from '../../hocs/withTranslation';
import styles from './editFilm.module.scss';

function EditFilmForm(props) {
  const { handleSubmit, goBack, editFilm_title, editFilm_img, editFilm_director, editFilm_genres, editFilm_description, editFilm_submit, editFilm_goBack } = props;
  return (
    <form className={styles.editForm} onSubmit={handleSubmit}>
      <label>
        {editFilm_title}:
        <Field
          name="title"
          component="input"
          type="text"
        />
      </label>
      <label>
        {editFilm_img}:
        <Field
          name="posterUrl"
          type="text"
          component="input"
        />
      </label>
      <label>
        {editFilm_director}:
        <Field
          name="director"
          type="text"
          component="input"
        />
      </label>
      <label>
        {editFilm_genres}:
        <Field
          name="genres"
          type="text"
          component="input"
        />
      </label>
      <label>
        {editFilm_description}:
        <Field
          name="description"
          type="text"
          component="textarea"
        />
      </label>
      <div className={styles.buttons}>
        <button>{editFilm_submit}</button>
        <button type='button' onClick={goBack}>{editFilm_goBack}</button>
      </div>
    </form>
  )
}

const withReduxForm = reduxForm({
  form: 'editFilm-form',
});

const withTranslationWords = withTranslation(['editFilm_title', 'editFilm_img', 'editFilm_director', 'editFilm_genres', 'editFilm_description', 'editFilm_submit', 'editFilm_goBack']);

export default withTranslationWords(withReduxForm(EditFilmForm));
