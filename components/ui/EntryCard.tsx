import { UIContext } from '@/context/ui';
import { Entry } from '@/interfaces'
import { dateFunctions } from '@/utils';
import { Card, CardActionArea, CardActions, CardContent, Typography, useTheme } from '@mui/material'
import { blue } from '@mui/material/colors';
import { Router, useRouter } from 'next/router';
import React, { DragEvent, FC, useContext } from 'react'

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {

  const { startDragging, endDragging } = useContext(UIContext)

  const router = useRouter();

  const onDragStart = (event: DragEvent) => {
    event.dataTransfer.setData('text', entry._id);
    startDragging();
  }

  const onDragEnd = () => {
    endDragging();
  }

  const onClick = () => {
    router.push(`/entries/${entry._id}`);
  }

  const theme = useTheme();
  const textColor = theme.palette.primary.main; 

  return (
    <Card
      sx={{ marginBottom: 1 }}
      // Eventos de drag>
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line', color: textColor }} variant='overline'><strong>{'>>'} {entry.title} </strong></Typography>
          <Typography sx={{ whiteSpace: 'pre-line' }} variant='body2'>{entry.description}</Typography>
        </CardContent>

        <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
          <Typography variant='body2'>{dateFunctions.getFormattedDistanceToNow(entry.createdAt)}</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}
