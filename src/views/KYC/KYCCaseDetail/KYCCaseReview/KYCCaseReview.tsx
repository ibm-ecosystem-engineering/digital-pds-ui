// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useAtomValue} from "jotai";
import {Button, FileUploader, Select, SelectItem, TextInput, CheckboxGroup, Checkbox} from "@carbon/react";
import {Stack} from "@carbon/react/lib/components/Stack"

import './KYCCaseReview.scss';
import {countriesAtomLoadable} from "../../../../atoms";
import {KycCaseModel} from "../../../../models";
import {kycCaseManagementApi} from "../../../../services";
import {fileListUtil} from "../../../../utils";

export interface KYCCaseReviewProps {
    currentCase: KycCaseModel;
    returnUrl: string;
}

export const KYCCaseReview: React.FunctionComponent<KYCCaseReviewProps> = (props: KYCCaseReviewProps) => {
    const countriesLoadable = useAtomValue(countriesAtomLoadable);
    const navigate = useNavigate();
    const [fileStatus, setFileStatus] = useState<'edit' | 'complete' | 'uploading'>('edit')

    const service = kycCaseManagementApi();

    const countries = countriesLoadable.state === 'hasData' ? countriesLoadable.data : [];

    const handleCancel = () => {
        navigate(props.returnUrl);
    }

    const handleSubmit = (event: {preventDefault: () => void}) => {
        event.preventDefault();

        service.reviewCase(props.currentCase.id, '').catch(err => console.error(err));

        navigate(props.returnUrl);
    }

    const handleFileUploaderChange = (event: {target: {files: FileList, filenameStatus: string}}) => {
        const files: FileList = event.target.files;
        const fileNames = fileListUtil(files).map(f => f.name)

        console.log('File uploader: ', {event, files, fileNames});

        setFileStatus('uploading')
        setTimeout(() => setFileStatus('complete'), 1000)
    }

    return (
        <Stack>
            <h2>Initial Review</h2>
            <TextInput
                helperText="The name of the customer"
                id="caseCustomerName"
                invalidText="Invalid customer name"
                labelText="Customer name"
                placeholder="Customer name"
                value={props.currentCase.customer.name}
                readOnly={true}
            />
            <Select
                id="caseCustomerCountry"
                invalidText="Invalid country selected"
                labelText="Country of residence"
                disabled={countriesLoadable.state !== 'hasData'}
                value={props.currentCase.customer.countryOfResidence}
                readOnly={true}
                style={{marginBottom: '20px'}}
            >
                {countries.map(option => <SelectItem key={option.value} text={option.text} value={option.value} />)}
            </Select>
            <TextInput
                helperText="The current risk category of the customer"
                id="caseCustomerRiskCategory"
                invalidText="Invalid risk category"
                labelText="Current risk category"
                placeholder="Risk category"
                value={props.currentCase.customer.riskCategory}
                readOnly={true}
            />
            <div style={{margin: '10px 0'}}>
                <Checkbox id="caseCustomerOutreach" labelText="Outreach required?" />
            </div>
            <TextInput
                helperText="The name of the counterparty"
                id="caseCounterpartyName"
                invalidText="Invalid counterparty name"
                labelText="Counterparty name"
                placeholder="Counterparty name"
                value={props.currentCase.counterParty?.name || ''}
                required={true}
            />
            <Select
                id="caseCounterpartyCountry"
                invalidText="Invalid counterparty country selected"
                labelText="Counterparty country"
                disabled={countriesLoadable.state !== 'hasData'}
                value={props.currentCase.counterParty?.countryOfResidence || 'US'}
                required={true}
                style={{marginBottom: '20px'}}
            >
                {countries.map(option => <SelectItem key={option.value} text={option.text} value={option.value} />)}
            </Select>
            <FileUploader
                labelTitle="Add documents"
                labelDescription="Max file size is 500mb."
                buttonLabel="Add file"
                buttonKind="primary"
                size="md"
                filenameStatus={fileStatus}
                // accept={['.jpg', '.png', '.pdf']}
                multiple={true}
                disabled={false}
                iconDescription="Delete file"
                onChange={handleFileUploaderChange}
                name="" />
            <div><Button kind="tertiary" onClick={handleCancel}>Cancel</Button> <Button type="submit" onClick={handleSubmit}>Submit</Button></div>
        </Stack>
    )
}
