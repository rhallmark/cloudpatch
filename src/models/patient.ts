
export interface Patient {

    _id: number;
    patient_first_name: string;
    patient_last_name: string;
    blood_type: string;
    diagnosis: string;
    heart_rate: number;
    temperature: number;

    height: number;
    weight: number;
    pulse: number;
    bloodPressureSystolic: number;
    bloodPressureDiastolic: number;
    chiefComplaint: string;
  
}

// User model based on the structure of github api at
// https://api.github.com/users/{username}
// export interface Patient {
//   login: string;
//   avatar_url: string;
//   public_repos: number;
//   public_gists: number;
//   followers: number;
//   following: number;
// }


// User model based on the required info for creating a new Patient


// Other stuff

// **PatientCare**
// HPI: string;
// PMF: string;
// SHX: string;
// Allergies: string;
// currentMedication: string;
// FamilyHistory: string;
// PostSurgeryHistory: string;
// CurrentIllnessHistory: string;
// diagnosis: string;


// **Lab**
// glucose: string;
// cholesterol: string;
// LDL: string;
// HDL: string;
// trigycerides: string;
// blood_other: string;
// urinalysis: string;

// **EMNT**
// ExternalAuditory
//     normal|cerumen|Foreign Body|Other
// TympanicMembrance
//     normal|bulging|dull|erythema|fluid|other
// NasalCavity
//     normal|erythema|pale|boggy|lesion/polyp|other
// LipsAndMouth
//     normal|other
// teeth
//     normal|dentures|missing|other
// Gums
//     normal|gingival hypertrophy|other
// ThroatAndTonsils
//     normal|other