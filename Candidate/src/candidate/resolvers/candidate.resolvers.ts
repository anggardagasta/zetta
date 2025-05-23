import {Resolver, Query, Mutation, Args, Context} from '@nestjs/graphql';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Candidate, CandidateDocument} from '../schemas/candidate.schema';
import {CandidateInput, UpdateCandidateInput} from '../dto/candidate.input';
import {CurrentUser} from "../../auth/decorators/current-user.decorator";
import {CandidateService} from "../services/candidate.service";

@Resolver(() => Candidate)
export class CandidateResolvers {
    constructor(
        @InjectModel(Candidate.name)
        private readonly candidateService: CandidateService,
        // private candidateModel: Model<CandidateDocument>,
    ) {
    }

    // @Query(() => [Candidate])
    // async candidates(): Promise<Candidate[]> {
    //     return this.candidateModel.find().exec();
    // }
    //
    // @Query(() => Candidate, {nullable: true})
    // async candidate(@Args('id') id: string): Promise<Candidate | null> {
    //     return this.candidateModel.findById(id).exec();
    // }
    //
    // @Mutation(() => Candidate)
    // async createCandidate(@Args('input') input: CandidateInput): Promise<Candidate> {
    //     const createdCandidate = new this.candidateModel(input);
    //     return createdCandidate.save();
    // }

    @Mutation(() => Candidate)
    async updateCandidate(
        @Args('updateCandidateInput') updateCandidateInput: UpdateCandidateInput,
        @CurrentUser() user: any,
    ): Promise<Boolean> {
        if (!user) {
            throw new Error('Access denied');
        }

        await this.candidateService.updateCandidate(user.user_id, updateCandidateInput)

        return true

        // return this.candidateModel.findByIdAndUpdate(id, input, {new: true}).exec();
    }

    // @Mutation(() => Candidate, {nullable: true})
    // async deleteCandidate(@Args('id') id: string): Promise<Candidate | null> {
    //     return this.candidateModel.findByIdAndDelete(id).exec();
    // }
}