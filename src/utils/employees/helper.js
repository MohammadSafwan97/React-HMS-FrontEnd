export const getIdLabel = (category) => {
  switch (category) {
    case 'PN Civilian':
      return 'P No';
    case 'PN CPO':
      return 'P JO No';
    case 'Sailor':
      return 'O No';
    case 'Contract Employee':
      return 'EMP No';
    default:
      return 'ID';
  }
};

export const tabCategoryMap = {
  uniform: ['PN CPO', 'Sailor'],
  civilian: ['PN Civilian'],
  contract: ['Contract Employee'],
};
