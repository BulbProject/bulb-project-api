import { Category } from 'types/data/category';
import { Criterion } from 'types/parts';

export const generateTemplate = (category: Category, creteria: Criterion[]): string => {
  return `
    <html>
      <head>
        <meta charset="UTF-8">
      </head>
      <body>
        <h1>Специфікація на товар / послугу</h1>
          
          <table>
            <tr>
              <td>Конкретна назва предмету закупівлі</td>
              <td>${category.title}</td>
            </tr>
            <tr>
              <td>Деталізований код за ДК: 021-2015</td>
              <td>${category.classification.id}</td>
            </tr>
            <tr>
              <td>Назва код згідно ДК: 021-2015</td>
              <td>${category.classification.description}</td>
            </tr>
          </table>
      </body>
    </html>
  `;
};
