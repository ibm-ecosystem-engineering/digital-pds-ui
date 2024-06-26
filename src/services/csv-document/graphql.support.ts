import {gql} from "@apollo/client";

import {CsvDocumentModel, CsvPredictionModel, CsvPredictionResultModel} from "../../models";

export const QUERY_LIST_DOCUMENTS = gql`
    query ListCsvDocuments($status: CsvDocumentStatusFilter) {
        listCsvDocuments(status: $status) {
            id
            name
            description
            status
            originalUrl
        }
    }
`
export type ReturnTypeListDocuments = {listCsvDocuments: CsvDocumentModel[]}

export const QUERY_GET_DOCUMENT = gql`
    query GetCsvDocument($id: ID!) {
        getCsvDocument(id: $id) {
            id
            name
            description
            status
            originalUrl
        }
    }
`
export type ReturnTypeGetDocument = {getCsvDocument: CsvDocumentModel}

export const MUTATE_DELETE_DOCUMENT = gql`
    mutation DeleteCsvDocument($id: ID!) {
        deleteCsvDocument(id: $id) {
            id
        }
    }
`
export type ReturnTypeDeleteDocument = {deleteCsvDocument: {id: string}}

export const QUERY_LIST_DOCUMENT_RECORDS = gql`
    query ListCsvDocumentRecords($documentId: ID!) {
        listCsvDocumentRecords(id: $documentId) {
            id
            documentId
            providedValue
            data
        }
    }
`
export interface CsvDocumentRecordBackendModel {
    id: string;
    documentId: string;
    providedValue: string;
    data: string;
}

export type ReturnTypeListDocumentRecords = {listCsvDocumentRecords: CsvDocumentRecordBackendModel[]}

export const QUERY_LIST_PREDICTIONS = gql`
    query ListCsvPredictions($documentId: ID!) {
        listCsvPredictions(id: $documentId) {
            id
            documentId
            model
            date
            predictionUrl
            performanceSummary {
                totalCount
                confidenceThreshold
                agreeAboveThreshold
                agreeBelowThreshold
                disagreeAboveThreshold
                disagreeBelowThreshold
                correctedRecords
            }
        }
    }
`
export type ReturnTypeListPredictions = {listCsvPredictions: CsvPredictionModel[]}

export const QUERY_LIST_PREDICTION_RECORDS = gql`
    query ListCsvPredictionRecords($predictionId: ID!, $options: CsvPredictionRecordOptions) {
        listCsvPredictionRecords(id: $predictionId, options: $options) {
            id
            documentId
            predictionId
            csvRecordId
            providedValue
            predictionValue
            confidence
            agree
        }
    }
`
export type ReturnTypeListPredictionRecords = {listCsvPredictionRecords: CsvPredictionResultModel[]}

export const MUTATION_CREATE_PREDICTION = gql`
    mutation CreateCsvPrediction($documentId: ID!) {
        createCsvPrediction(id: $documentId) {
            id
            documentId
            model
            date
            predictionUrl
            performanceSummary {
                totalCount
                confidenceThreshold
                agreeAboveThreshold
                agreeBelowThreshold
                disagreeAboveThreshold
                disagreeBelowThreshold
                correctedRecords
            }
        }
    }
`
export type ReturnTypeCreatePrediction = {createCsvPrediction: CsvPredictionModel}

export const SUBSCRIPTION_DOCUMENTS = gql`
    subscription ObserveCsvDocumentUpdates {
        observeCsvDocumentUpdates {
            id
            name
            description
            status
            originalUrl
        }
    }
`
export type ReturnTypeSubscriptionDocuments = {observeCsvDocumentUpdates: CsvDocumentModel}

export const SUBSCRIPTION_PREDICTIONS = gql`
    subscription ObserveCsvPrescriptionUpdates {
        observeCsvPredictionUpdates {
            id
            documentId
            model
            date
            predictionUrl
        }
    }
`
export type ReturnTypeSubscriptionPredictions = {observeCsvPredictionUpdates: CsvPredictionModel}
