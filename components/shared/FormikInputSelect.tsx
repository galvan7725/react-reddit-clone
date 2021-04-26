import React from 'react';
import { FormFeedback,FormGroup, Input, Label } from 'reactstrap';

const FormikInputSelect =  ({
    field: {...fields},
    form:{touched, errors, ...rest},
    ...props
}) : JSX.Element =>(
    <FormGroup>
        <Label for={props.id}>{props.label}</Label>
        <Input {...props} {...fields} invalid={Boolean(touched[fields.name] && errors[fields.name])}>
            {props.type === 'select' && props.optionsselect.length > 0 ? (
                 <>
                    {props.optionsselect.map((option, i) =>(
                        <><option value={option.name}>{option.name}</option></>
                    ))}
                 </>   
            ) : (
                <></>
            )}
        </Input>
        {touched[fields.name] && errors[fields.name] ? <FormFeedback>{errors[fields.name]}</FormFeedback> : null}
    </FormGroup>
);



export default FormikInputSelect;