import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Candidate, CandidateDocument} from "../schemas/candidate.schema";
import {Model} from "mongoose";
import {ParentInput, UpdateCandidateInput} from "../dto/candidate.input";
import {IbanHistoryService} from "../../iban-history/services/iban-history.service";

@Injectable()
export class CandidateService {
    constructor(
        @InjectModel(Candidate.name) private candidateModel: Model<CandidateDocument>,
        private readonly ibanHistoryService: IbanHistoryService,
    ) {
    }

    async updateCandidate(
        userId: string,
        updateCandidateInput: UpdateCandidateInput,
    ): Promise<Boolean> {
        const candidateBeforeUpdate = await this.candidateModel.findById(updateCandidateInput._id).select('iban payment_supports parents').lean();
        if (!candidateBeforeUpdate) {
            throw new Error(`Candidate with ID ${updateCandidateInput._id} not found`);
        }

        const candidateInput = updateCandidateInput.candidateInput

        if (candidateInput.school) {
            candidateInput.school = String(candidateInput.school).toUpperCase();
        }
        if (candidateInput.campus) {
            candidateInput.campus = String(candidateInput.campus).toUpperCase();
        }

        if (candidateInput.civility) {
            if (candidateInput.civility === 'neutral') {
                candidateInput.sex = 'N';
            } else {
                candidateInput.sex = candidateInput.civility === 'MR' ? 'M' : 'F';
            }
        }

        await this.ibanHistoryService.handleParentIbanValidationAndHistory(updateCandidateInput._id, candidateInput.parents);

        // if (candidateInput.tagIDs === null) {
        //     candidateInput.tagIDs = [];
        // }

        if (candidateInput.iban && candidateInput.bic && candidateInput.accountHolderName) {
            const ibanHistory = await this.ibanHistoryService.createIbanHistoryRecord(
                updateCandidateInput._id,
                candidateInput.iban,
                candidateInput.bic,
                candidateInput.accountHolderName,
            )

            // try {
            //     // await CandidateUtility.validateIbanBicCandidate(candidate_input.iban, candidate_input.bic);
            //
            //     await IbanHistoryModel.updateOne({_id: ibanHistory._id}, {$set: {message: 'success'}});
            // } catch (error) {
            //     await IbanHistoryModel.updateOne({_id: ibanHistory._id}, {$set: {message: error}});
            //     throw new Error('IBAN/BIC validation failed for candidate.');
            // }
        }

        return true;
    }
}