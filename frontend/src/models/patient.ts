export interface Patient {

    // Triage
    _id: number;
    patient_first_name: string;
    patient_last_name: string;
    sex: string;
    blood_type: string;
    heart_rate: number;
    temperature: number;
    height: number;
    weight: number;
    pulse: number;
    bloodPressureSystolic: number;
    bloodPressureDiastolic: number;
    chiefComplaint: string;

    // Patient Care
    hpi: string;
    pmf: string;
    shx: string;
    allergies: string;
    current_meds: string;
    family_history: string;
    post_surgery_history: string;
    current_illness_history: string;
    diagnosis: string;

    // Patient Lab
    glucose: string;
    cholesterol: string;
    ldl: string;
    hdl: string;
    triglycerides: string;
    blood_other: string;
    urinalysis: string;

    // Patient enmt
    auditory: string;
    tympanic: string;
    nasal_cavity: string;
    lips_mouth: string;
    teeth: string;
    gums: string;
    throat_tonsils: string;
    enmt_other: string;

    // Patient Back
    spine: string;
    u_back: string;
    m_back: string;
    l_back: string;
    neck: string;
    neck_rom: string;
    back_other: string;

    // Patient Optical
    eyelids: string;
    conjunctive: string;
    sciera: string;
    fundus: string;
    optical_other: string;

    // Patient Respiratory
    resp_effort: string;
    auscultation: string;
    respiratory_other: string;

    // Patient Cardiovascular
    rythm: string;
    heart_sounds: string;
    abnormal_heart_sounds: string;
    cardiovascular_other: string;

    // Patient Gstrointestinal
    abdomen: string;
    bowels_luq: string;
    gastrointestinal_other: string;

    // Patient Musculoskeletal
    musculoskeletal_other: string;
    //?

    // Patient Psychiatric
    judgement: string;
    orientation_AO: string;
    psychiatric_other: string;


    // Women's Health
    mammogram: string;
    women_other: string;

}
