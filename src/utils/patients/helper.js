export const getIdLabel = (patientType) => {
  switch (patientType) {
    case 'Inpatient':
      return 'Patient ID';
    case 'Outpatient':
      return 'Patient ID';
    case 'Emergency':
      return 'Emergency ID';
    default:
      return 'ID';
  }
};

export const tabCategoryMap = {
  inpatient: ['Inpatient'],
  outpatient: ['Outpatient'],
  emergency: ['Emergency'],
};