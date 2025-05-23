import {InputType, Field, ID} from '@nestjs/graphql';

@InputType()
export class CandidateInput {
    @Field({nullable: true})
    school?: string;

    @Field({nullable: true})
    campus?: string;

    @Field({nullable: true})
    civility?: string;

    @Field({nullable: true})
    sex?: string;

    @Field(() => [ParentInput], {nullable: true})
    parents?: ParentInput[];

    // @Field({nullable: true})
    // tagIDs?: [];

    @Field({nullable: true})
    iban?: string;

    @Field({nullable: true})
    bic?: string;

    @Field({nullable: true})
    accountHolderName?: string;
}

@InputType()
export class ParentInput {
    @Field({nullable: true})
    iban?: string;

    @Field({nullable: true})
    bic?: string;

    @Field({nullable: true})
    accountHolderName?: string;
}

@InputType()
export class UpdateCandidateInput {
    @Field(() => ID)
    _id!: string;

    @Field()
    candidateInput!: CandidateInput;

    @Field()
    lang!: string;

    @Field()
    newDesiredProgram!: string;

    @Field()
    isFromAdmissionForm!: string;

    @Field()
    isPreventResendNotif!: string;

    @Field()
    isSaveIdentityStudent!: string;

    @Field()
    isMinorStudent!: string;
}