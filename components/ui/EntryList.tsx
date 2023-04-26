import { Button, List, Paper } from "@mui/material"
import { EntryCard } from "./EntryCard"
import { EntryStatus } from "@/interfaces"
import { DragEvent, FC, useContext, useMemo } from "react";
import { EntriesContext } from '../../context/entries/EntriesContext';
import RotateRightOutlinedIcon from '@mui/icons-material/RotateRightOutlined';
import { UIContext } from "@/context/ui";
import styles from './EntryList.module.css'

interface Props {
  status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {

  const { entries, updateEntry } = useContext(EntriesContext);

  const { isDragging, endDragging } = useContext(UIContext)

  const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries]);

  const onDropEntry = (event: DragEvent) => {
    const id = event.dataTransfer.getData('text');

    const entry = entries.find(entry => entry._id === id)!;
    entry.status = status;
    updateEntry(entry);
    endDragging();
  }

  const allowDrop = (event: DragEvent) => {
    event.preventDefault();
  }

  return (
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={isDragging ? styles.dragging : ''}>

      <Paper sx={{ height: 'calc(100vh - 250px)', overflow: 'scroll', backgroundColor: 'transparent', padding: '1px 5px' }}>

        <List sx={{ opacity: isDragging ? 0.3 : 1, transition: 'all .3s' }}>
          {
            entriesByStatus.map(entry => (
              <EntryCard key={entry._id} entry={entry} />
            ))
          }
        </List>
        
      </Paper>
    </div>
  )
}
