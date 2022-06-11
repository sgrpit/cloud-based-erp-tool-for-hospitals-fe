import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@material-ui/styles';
import { Grid, Container, Typography } from '@material-ui/core';
// components
import Page from '../../Component/Page';

// sections

import AppWidgetSummary from '../../sections/AppWidgetSummary';
// ----------------------------------------------------------------------

export default function DashboardApp() {
  const theme = useTheme();

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome {localStorage.getItem("StaffName")}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Patient" total={30000} icon={'healthicons:group-discussion-meetingx3-outline'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total IPD" total={12000} color="info" icon={'healthicons:medicines-negative'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total OPD" total={17000} color="warning" icon={'healthicons:malaria-pv-microscope-negative'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Surgeries" total={234} color="#b9f4e6" icon={'healthicons:pediatric-surgery-outline'} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
