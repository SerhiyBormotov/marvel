import {Formik, Form, Field, ErrorMessage} from 'formik';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import './find-character.scss';
const FindCharacter = (name) => {
    const {loading, error, getCharacterByName, clearError} = useMarvelService();
    const [char, setChar] = useState({});


    const formValidate = (values) => {
        const errors = {};
        if (values.name.length === 0) {
            errors.name = "You must enter a name of a character first"
        } 
        return errors;
    }

    const onFormSubmit = ({name}) => {
        clearError();
        getCharacterByName(name)
        .then(setChar);
    }

    const resultLayout = () => {

        return (
            <>
            {error && <div className='find-character__error-message'>Something went wrong. Try again later</div>}
            {char.id === null && <div className='find-character__error-message'>The character was not found. Check the name and try again. </div>}
            {char.id && 
            <>
                <div className='find-character__error-message find-character__success'>There is! Visit {char.name} page? </div>
                <Link 
                    className="button button__secondary"
                    to={`/${char.id}`}
                    >
                        <div className="inner">To Page</div>
                    </Link>
            </>
            }
            </>
        )
    }

    return (
        <div className="find-character">
            <div className="find-character__title">Or find a character by name</div>
            <Formik
            initialValues={{name: ''}}
            validate={formValidate}
            onSubmit={onFormSubmit}>
                <Form
                className='find-character__form'>
                    <Field
                    className="find-character__input"
                    type="search"
                    name="name"
                    placeholder="Enter name"/>

                    <button 
                    className="button button__main"
                    onClick={() => {}}
                    disabled={loading}
                    type="submit">
                        <div className="inner">Find</div>
                    </button>
                    <ErrorMessage name="name" component="div" className="find-character__error-message"/>
                    {resultLayout()}
                </Form>
            </Formik>
            
            
        </div>
    )
}

export default FindCharacter;