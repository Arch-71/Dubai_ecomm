export default function Paper(theme) {
  return {
    MuiPaper: {
      defaultProps: {
        elevation: 0
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: theme.palette.mode === 'dark' ? '#121212' : theme.palette.background.default,
          borderRadius: theme.spacing(1),
          '&.MuiPaper-elevation1': {
            boxShadow: theme.palette.mode === 'dark' 
              ? '0 2px 4px -1px rgba(0,0,0,0.4)'
              : theme.shadows[1]
          }
        }
      }
    }
  };
}
