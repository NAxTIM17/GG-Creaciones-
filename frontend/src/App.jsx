import './App.css';
import BusinessRouter from './components/BusinessRouter';
import { Accordion, AccordionItem, Button } from "@nextui-org/react";

function App() {
  const defaultContent = 'Hola a todes 🏳️';
  return (
    <div>
        <BusinessRouter />
    <Accordion>
      <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
        {defaultContent}
      </AccordionItem>
      <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
        {defaultContent}
      </AccordionItem>
      <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
        {defaultContent}
      </AccordionItem>
    </Accordion>

    <div className="flex gap-2 items-center bg-slate-400">
      <Button size="sm" className="relative overflow-visible rounded-full hover:-translate-y-1 px-12 shadow-xl bg-background/30 after:content-[''] after:absolute after:rounded-full after:inset-0 after:bg-background/40 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0">
        Small
      </Button>  
      <Button size="md">
        Medium
      </Button>  
      <Button size="lg">
        Large
      </Button>  
    </div>
    </div>
  )
}

export default App;
