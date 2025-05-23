import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {IbanHistory, IbanHistoryDocument} from '../schemas/iban-history.schema';
import {ParentInput} from "../../candidate/dto/candidate.input";

@Injectable()
export class IbanHistoryService {
    constructor(
        @InjectModel(IbanHistory.name) private ibanHistoryModel: Model<IbanHistoryDocument>,
    ) {
    }

    async handleParentIbanValidationAndHistory(
        candidateId: string,
        parents?: ParentInput[],
    ): Promise<void> {
        if (parents && parents.length) {
            for (let parent of parents) {
                if (parent.iban && parent.bic && parent.accountHolderName) {
                    const ibanHistory = await this.createIbanHistoryRecord(
                        candidateId,
                        parent.iban,
                        parent.bic,
                        parent.accountHolderName,
                        (parent as any).name,
                        (parent as any).family_name,
                    );

                    try {
                        // await CandidateUtility.validateIbanBicCandidate(parent.iban, parent.bic);
                        await this.ibanHistoryModel.updateOne({_id: ibanHistory._id}, {$set: {message: 'success'}});
                    } catch (error) {
                        await this.ibanHistoryModel.updateOne({_id: ibanHistory._id}, {$set: {message: error}});
                        throw new Error('IBAN/BIC validation failed for parent.');
                    }
                }
            }
        }
    }

    async createIbanHistoryRecord(
        candidateId: string,
        iban: string,
        bic: string,
        accountHolderName: string,
        financialSupportFirstName?: string,
        financialSupportLastName?: string,
    ): Promise<IbanHistoryDocument> {
        return this.ibanHistoryModel.create({
            candidateId: candidateId,
            iban: iban,
            bic: bic,
            accountHolder_name: accountHolderName,
            financialSupportFirstName: financialSupportFirstName,
            financialSupportLastName: financialSupportLastName,
        });
    }
}