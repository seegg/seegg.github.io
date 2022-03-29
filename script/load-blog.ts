import { getRamblings } from './data';
import { createElementWithClasses } from './util';

const about = document.getElementById('about');

export const loadRamblings = async () => {
  const data = await getRamblings('https://seegg.github.io/script/ramblings.json');
  data.ramblings.forEach(article => {
    const rambling = createRambling(article.text);
    about?.appendChild(rambling);
  });
}

const createRambling = (input: string) => {
  const container = createElementWithClasses('article', 'ramblings');
  input.split('\n').forEach(paragraph => {
    const para = document.createElement('p');
    para.textContent = paragraph;
    container.appendChild(para);
  });

  return container;
}