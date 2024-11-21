const formatDate = (date) => {
    return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'numeric',
      year: 'numeric',
    });
  };

  module.exports={formatDate}