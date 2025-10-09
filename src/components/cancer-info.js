export const cancer_info = {
  shared: {
    Head: [
      { name: 'Brain tumor (primary/metastatic)', note: 'Symptoms: headaches, seizures, focal deficits.' },
      { name: 'Head & neck (oral, laryngeal)', note: 'Often linked to tobacco/alcohol/HPV.' }
    ],
    Chest: [
      { name: 'Lung', note: 'Common; smoking major risk; screening for high-risk groups.' }
    ],
    Abdomen: [
      { name: 'Colorectal', note: 'Screening via colonoscopy/fit test; symptoms: bleeding, change in bowel.' },
      { name: 'Liver', note: 'Chronic hepatitis or cirrhosis risk factors.' },
      { name: 'Pancreatic', note: 'Often late presentation; risk factors include smoking, age.' }
    ],
    Pelvis: [
      { name: 'Bladder', note: 'Hematuria is common sign.' },
      { name: 'Rectal', note: 'Covered under colorectal spectrum.' }
    ],
    LeftArm: [{ name: 'Soft tissue sarcoma', note: 'Rare; depends on histology.' }],
    RightArm: [{ name: 'Soft tissue sarcoma', note: 'Rare; depends on histology.' }],
    LeftLeg: [{ name: 'Soft tissue/bone sarcoma', note: 'Ewing’s/osteosarcoma (younger pts).' }],
    RightLeg: [{ name: 'Soft tissue/bone sarcoma', note: 'Ewing’s/osteosarcoma (younger pts).' }]
  },
  male: {
    Chest: [{ name: 'Male breast (rare)', note: 'Painless mass; BRCA2 risk.' }],
    Pelvis: [{ name: 'Prostate', note: 'PSA discussion by age/risk; LUTS not specific.' }],
  },
  female: {
    Chest: [{ name: 'Breast', note: 'Screening mammography by age/risk; self-awareness.' }],
    Pelvis: [
      { name: 'Cervical', note: 'HPV vaccination & screening key.' },
      { name: 'Ovarian', note: 'Often vague symptoms; family history important.' },
      { name: 'Endometrial', note: 'Post-menopausal bleeding hallmark.' }
    ]
  }
}