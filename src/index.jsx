import { createRoot } from 'react-dom/client';
import NoteMain from './component/NoteMain';

import './styles/style.css'

const root = createRoot(document.getElementById('root'));
root.render(<NoteMain />)