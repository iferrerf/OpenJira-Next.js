import { List, Paper } from "@mui/material"
import { EntryCard } from "./EntryCard"
import { EntryStatus } from "@/interfaces"
import { DragEvent, FC, useContext, useMemo } from "react";
import { EntriesContext } from '../../context/entries/EntriesContext';
import { UIContext } from "@/context/ui";
import styles from './EntryList.module.css'
import { blue, grey } from '@mui/material/colors';

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

      <Paper sx={{ height: 'calc(100vh - 300px)', overflow: 'scroll', backgroundColor: grey[500], padding: '2px 10px' }}>

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
