import React from 'react';
import { FormFeedback,FormGroup, Input, Label } from 'reactstrap';

const FormikInput =  ({
    field: {...fields},
    form:{touched, errors, ...rest},
    ...props
}) : JSX.Element =>(
    <FormGroup>
        <Label for={props.id}>{props.label}</Label>
        <Input {...props} {...fields} invalid={Boolean(touched[fields.name] && errors[fields.name])}/>
        {touched[fields.name] && errors[fields.name] ? <FormFeedback>{errors[fields.name]}</FormFeedback> : null}
    </FormGroup>
);


export default FormikInput;
