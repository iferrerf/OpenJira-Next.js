import { Layout } from '@/components/layouts'
import { EntryCard, EntryList, NewEntry } from '@/components/ui'
import { Card, CardContent, CardHeader, Grid, Typography, IconButton, Button, Icon } from '@mui/material';
import RotateRightOutlinedIcon from '@mui/icons-material/RotateRightOutlined';


export default function HomePage() {
  return (
    <Layout title='Home - OpenJira'>
      <Grid container spacing={2}>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh-100px)' }}>
            <CardHeader title='Pendientes'/>

            <CardContent>
              <NewEntry />
              <EntryList status='pending' />

            </CardContent>

          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh-100px)' }}>
            <CardHeader title='En Progreso' />
            <CardContent>
              <EntryList status='in-progress' />

            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh-100px)" }}>
            <CardHeader title='Completados' />
            <CardContent>
              <EntryList status='finished' />

            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Layout>
  )
}
