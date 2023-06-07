import { Layout } from '@/components/layouts'
import { EntryList, NewEntry } from '@/components/ui'
import { AssignmentTurnedInOutlined, BorderColorOutlined, PendingActionsOutlined } from '@mui/icons-material';
import { Avatar, Card, CardContent, CardHeader, Grid, } from '@mui/material';
import { blue, green, grey} from '@mui/material/colors';


export default function HomePage() {
  return (

    <Layout>

      <NewEntry />

      <Grid container spacing={2}>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh-100px)' }}>
          <CardHeader
              sx={{
                display: 'flex',
                alignItems: 'start',
                justifyContent: 'start',
                textAlign: 'start',
                pl: 10
              }}
              avatar={
                <Avatar sx={{backgroundColor:blue[300]}}>
                  <PendingActionsOutlined sx={{color:blue[800]}}/>
                </Avatar>
              }
              title={'Pendientes'}
              titleTypographyProps={{variant:'h5'}}
            >
            </CardHeader>

            <CardContent>
              <EntryList status='pending' />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh-100px)' }}>
            <CardHeader
              sx={{
                display: 'flex',
                alignItems: 'start',
                justifyContent: 'start',
                textAlign: 'start',
                pl: 10
              }}
              avatar={
                <Avatar sx={{backgroundColor:grey[500]}}>
                  <BorderColorOutlined/>
                </Avatar>
              }
              title={'En progreso'}
              titleTypographyProps={{variant:'h5'}}
            >
            </CardHeader>
            <CardContent>
              <EntryList status='in-progress' />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh-100px)" }}>
          <CardHeader
              sx={{
                display: 'flex',
                alignItems: 'start',
                justifyContent: 'start',
                textAlign: 'start',
                pl: 10
              }}
              avatar={
                <Avatar sx={{backgroundColor:green[400]}}>
                  <AssignmentTurnedInOutlined sx={{color:green[700]}} />
                </Avatar>
              }
              title={'Completado'}
              titleTypographyProps={{variant:'h5'}}
            >
            </CardHeader>
            <CardContent>
              <EntryList status='finished' />
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Layout>
  )
}
