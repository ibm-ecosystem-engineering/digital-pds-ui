// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, {ChangeEvent, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Button, Form, Select, SelectItem, TextInput} from "@carbon/react";
import {Stack} from "@carbon/react/lib/components/Stack"
import {default as setValue} from 'set-value';
import {useAtomValue} from "jotai";

import {createEmptyCustomer, CustomerModel} from "../../../../models";
import {kycCaseManagementApi} from "../../../../services";
import {countriesAtomLoadable} from "../../../../atoms";

export interface KYCCaseNewProps {
    returnUrl: string;
}

export const KYCCaseNew: React.FunctionComponent<KYCCaseNewProps> = (props: KYCCaseNewProps) => {
    const countriesLoadable = useAtomValue(countriesAtomLoadable);
    const navigate = useNavigate();
    const [newCustomer, setNewCustomer] = useState<CustomerModel>(createEmptyCustomer())

    const service = kycCaseManagementApi();

    const countries = countriesLoadable.state === 'hasData' ? countriesLoadable.data : [];

    const handleCancel = () => {
        navigate(props.returnUrl);
    }

    const handleSubmit = (event: {preventDefault: () => void}) => {
        event.preventDefault();

        service.createCase(newCustomer).catch(err => console.error(err));

        navigate(props.returnUrl);
    }

    const handleChange = (key: keyof CustomerModel) => {
        return (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

            const updatedCase = JSON.parse(JSON.stringify(newCustomer));

            setValue(updatedCase, key, event.target.value);

            setNewCustomer(updatedCase);
        }
    }

    return (
        <Form className="newCaseForm" onSubmit={handleSubmit}>
            <Stack gap={7}>
                <h2>Submit new case</h2>
                <TextInput
                    helperText="The name of the customer"
                    id="caseCustomerName"
                    invalidText="Invalid customer name"
                    labelText="Customer name"
                    placeholder="Customer name"
                    value={newCustomer.name}
                    onChange={handleChange('name')}
                    required={true}
                />
                <Select
                    id="caseCustomerCountry"
                    invalidText="Invalid country selected"
                    labelText="Country of residence"
                    disabled={countriesLoadable.state !== 'hasData'}
                    value={newCustomer.countryOfResidence}
                    onChange={handleChange('countryOfResidence')}
                    required={true}
                >
                    {countries.map(option => <SelectItem key={option.value} text={option.text} value={option.value} />)}
                </Select>
                <TextInput.PasswordInput
                    helperText="The personal identification number of the customer"
                    id="caseCustomerPIN"
                    type="password"
                    invalidText="Invalid personal identification number"
                    labelText="Personal identification number"
                    placeholder="Personal identification number"
                    value={newCustomer.personalIdentificationNumber}
                    onChange={handleChange('personalIdentificationNumber')}
                    required={true}
                />
                <TextInput
                    helperText="The current risk category of the customer"
                    id="caseCustomerRiskCategory"
                    invalidText="Invalid risk category"
                    labelText="Current risk category"
                    placeholder="Risk category"
                    value={newCustomer.riskCategory}
                    onChange={handleChange('riskCategory')}
                    required={true}
                />
                <div><Button kind="tertiary" onClick={handleCancel}>Cancel</Button> <Button type="submit">Submit</Button></div>
            </Stack>
        </Form>
    )
}
