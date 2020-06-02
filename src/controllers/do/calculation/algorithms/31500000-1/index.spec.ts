import algorithm from './index';

const category = {
  id: '31500000-1',
  title: 'Електричні лампи внутрішнього освітлення',
  description:
    'Основними вимогами, що ставляться до сучасного освітлення є наступні: забезпечення найкращих умов зорової роботи, керування освітленням безпосередньо із робочого місця, енергоефективність, енергозбереження протягом усього періоду експлуатації, мінімізація шкоди навколишньому середовищу.',
  classification: {
    scheme: 'CPV',
    id: '31500000-1',
    description: 'Освітлювальне обладнання та електричні лампи',
  },
  items: [
    {
      id: '31519100-8',
      description: 'Лампа розжарення',
      classification: {
        scheme: 'CPV',
        id: '31519100-8',
        description: 'Лампи розжарення',
      },
      additionalClassifications: [
        {
          scheme: 'ProzorroMarketProfile',
          id: '799120-0001',
          description: 'Лампа розжарення',
        },
      ],
    },
    {
      id: '31512000-8',
      description: 'Галогенна лампа',
      classification: {
        scheme: 'CPV',
        id: '31512000-8',
        description: 'Галогенні лампи розрядження',
      },
      additionalClassifications: [
        {
          scheme: 'ProzorroMarketProfile',
          id: '799120-0002',
          description: 'Галогенні лампи',
        },
      ],
    },
    {
      id: '31532900-3',
      description: 'Люмінісцентна лампа',
      classification: {
        scheme: 'CPV',
        id: '31532900-3',
        description: 'Люмінісцентні лампи',
      },
      additionalClassifications: [
        {
          scheme: 'ProzorroMarketProfile',
          id: '799120-0001',
          description: 'Люмінісцентні лампи',
        },
      ],
    },
    {
      id: '31712341-2',
      description: 'Світлодіодна лампа',
      classification: {
        scheme: 'CPV',
        id: '31712341-2',
        description: 'Світлодіоди',
      },
      additionalClassifications: [
        {
          scheme: 'ProzorroMarketProfile',
          id: '799120-0001',
          description: 'Світлодіодні лампи',
        },
      ],
    },
  ],
  documents: [
    {
      id: '1922475e-a7e9-46d1-b8c0-511ee69539d2-1559562995276',
      documentType: 'illustration',
      title: 'Лампа розжарення',
      relatesTo: 'item',
      relatedItem: '31519100-8',
      url: 'https://github.com/BulbProject/bulb-project-api/raw/develop/documents/incandescent.png',
      datePublished: '2020-05-08T10:30:00Z',
    },
    {
      id: '1922475e-a7e9-46d1-b8c0-511ee69539d2-1559562995245',
      documentType: 'illustration',
      title: 'Галогенна лампа',
      relatesTo: 'item',
      relatedItem: '31512000-8',
      url: 'https://github.com/BulbProject/bulb-project-api/raw/develop/documents/halogen.png',
      datePublished: '2020-05-08T10:31:00Z',
    },
    {
      id: '1922475e-a7e9-46d1-b8c0-511ee69539d2-1559562995132',
      documentType: 'illustration',
      title: 'Люмінісцентна лампа',
      relatesTo: 'item',
      relatedItem: '31532900-3',
      url: 'https://github.com/BulbProject/bulb-project-api/raw/develop/documents/fluorescent.png',
      datePublished: '2020-05-08T10:32:00Z',
    },
    {
      id: '1922475e-a7e9-46d1-b8c0-511ee69539d2-1559562995246',
      documentType: 'illustration',
      title: 'Світлодіодна лампа',
      relatesTo: 'item',
      relatedItem: '31712341-2',
      url: 'https://github.com/BulbProject/bulb-project-api/raw/develop/documents/led.png',
      datePublished: '2020-05-08T10:33:00Z',
    },
    {
      id: '1922475e-a7e9-46d1-b9c0-511ee69539d2-1559562995246',
      documentType: 'illustration',
      title: 'Освітлення приміщення',
      url: 'https://www.zwsoft.ru/sites/default/files/inline-images/promyshlennoe.jpg',
      datePublished: '2020-05-08T10:34:00Z',
    },
  ],
  criteria: [
    {
      id: '0100000000',
      title: 'Потреба',
      requirementGroups: [
        {
          id: '0101000000',
          description: 'Придбання конкретно визначеної лампи',
          requirements: [
            {
              id: '0101010000',
              title: 'Потужність лампи',
              dataType: 'number',
              unit: {
                scheme: 'UNCEFACT',
                id: '345',
                name: 'Вт',
              },
            },
            {
              id: '0101020000',
              title: 'Кількість ламп',
              dataType: 'integer',
              minValue: 1,
              unit: {
                id: '',
                name: 'шт',
              },
            },
          ],
        },
        {
          id: '0102000000',
          description: 'Типовой проект з освітлення',
          requirements: [
            {
              id: '0102010000',
              title: 'Визначте тип проекту',
              dataType: 'string',
              optionDetails: {
                optionGroups: [
                  {
                    id: '0102010100',
                    description:
                      'Адміністративні будинки (міністерства, відомства, комітети, префектури, муніципалітети, управління, конструкторські та проектні організації, науково-дослідні установи тощо)',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0102010101',
                        description: 'Кабінети й робочі кімнати',
                        value: 'OFFICES_AND_STUDY_ROOMS',
                      },
                      {
                        id: '0102010102',
                        description: 'Проектні зали і кімнати, конструкторські, креслярські бюро',
                        value: 'DESIGN_HALLS_AND_ROOMS_DESIGN_DRAWING_BUREAUS',
                      },
                      {
                        id: '0102010103',
                        description: 'Книгосховища й архіви, приміщення фонду відкритого доступу',
                        value: 'BOOKSTORES_AND_ARCHIVES',
                      },
                      {
                        id: '0102010104',
                        description: 'Макетні, столярні й ремонтні майстерні',
                        value: 'REPAIR_SHOPS',
                      },
                      {
                        id: '0102010105',
                        description: 'Приміщення для роботи з дисплеями й відеотерміналами, дисплейні зали',
                        value: 'ROOM_FOR_WORKING_WITH_DISPLAYS',
                      },
                      {
                        id: '0102010106',
                        description: 'Конференц-зали, зали засідань',
                        value: 'CONFERENCE_HALLS',
                      },
                      {
                        id: '0102010107',
                        description: 'Читальні зали',
                        value: 'READING_ROOMS',
                      },
                      {
                        id: '0102010108',
                        description: 'Кулуари (фойє)',
                        value: 'LOBBY',
                      },
                      {
                        id: '0102010109',
                        description:
                          'Лабораторії: органічної й неорганічної хімії, термічні, фізичні, спектрографічні, стилометрічні, фотометричні, мікроскопні, рентгеноструктурного аналізу, механічні та радіовимірювальні, електронних пристроїв, препараторські',
                        value: 'LABORATORIES',
                      },
                      {
                        id: '0102010110',
                        description: 'Аналітичні лабораторії',
                        value: 'ANALYTICAL_LABORATORIES',
                      },
                    ],
                  },
                  {
                    id: '0102010200',
                    description: 'Банківські та страхові установи',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0102010201',
                        description: 'Операційний зал, кредитна група, касовий зал',
                        value: 'OPERATING_ROOM',
                      },
                      {
                        id: '0102010202',
                        description: 'Приміщення для перерахування грошей',
                        value: 'PREMISES_FOR_MONEY_TRANSFER',
                      },
                    ],
                  },
                  {
                    id: '0102010300',
                    description: 'Установи загальної освіти, початкової, середньої та вищої спеціальної освіти',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0102010301',
                        description:
                          'Класні кімнати, аудиторії, навчальні кабінети, лабораторії загальноосвітніх шкіл, шкілінтернатів, середньо-спеціальних і професійно-технічних установ',
                        value: 'CLASSROOMS',
                      },
                      {
                        id: '0102010302',
                        description:
                          'Аудиторії навчальні кабінети, лабораторії в технікумах і вищих навчальних закладах',
                        value: 'CLASSROOMS_CLASSROOMS',
                      },
                      {
                        id: '0102010303',
                        description: 'Кабінети інформатики і обчислювальної техніки',
                        value: 'COMPUTER_SCIENCE_CLASSROOMS',
                      },
                      {
                        id: '0102010304',
                        description: 'Кабінети технічного креслення та малювання',
                        value: 'CABINETS_OF_TECHNICAL_DRAWING',
                      },
                      {
                        id: '0102010305',
                        description: 'Майстерні з обробки металів та деревини',
                        value: 'WORKROOMS',
                      },
                      {
                        id: '0102010306',
                        description: 'Кабінети обслуговуючих видів праці для дівчат',
                        value: 'OFFICES_OF_SERVICE_TYPES_OF_WORK_FOR_GIRLS',
                      },
                      {
                        id: '0102010307',
                        description: 'Спортивні зали',
                        value: 'GYMS',
                      },
                      {
                        id: '0102010308',
                        description: 'Криті басейни',
                        value: 'INDOOR_POOLS',
                      },
                      {
                        id: '0102010309',
                        description: 'Актовізали, кіноаудиторії',
                        value: 'ACTUALS_AND_MOVIE_AUDIENCES',
                      },
                      {
                        id: '0102010310',
                        description: 'Естради актових залів',
                        value: 'VARIETY_OF_ASSEMBLY_HALLS',
                      },
                      {
                        id: '0102010311',
                        description: 'Кабінети й кімнати викладачів',
                        value: 'TEACHERS_OFFICES_AND_ROOMS',
                      },
                      {
                        id: '0102010312',
                        description: 'Рекреації',
                        value: 'RECREATION',
                      },
                    ],
                  },
                  {
                    id: '0102010400',
                    description: 'Установи дозвіллєвого призначення',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0102010401',
                        description: 'Зали багатоцільового призначення',
                        value: 'MULTIPURPOSE_HALLS',
                      },
                      {
                        id: '0102010402',
                        description: 'Зали для глядачів театрів, концертні зали',
                        value: 'THEATER_AUDITORIUMS',
                      },
                      {
                        id: '0102010403',
                        description:
                          'Зали для глядачів клубів, клуб-вітальня, приміщення для дозвіллєвих занять, зборів, фойє театрів',
                        value: 'HALLS_FOR_SPECTATORS_OF_CLUBS',
                      },
                      {
                        id: '0102010404',
                        description: 'Виставкові зали',
                        value: 'EXHIBITION_HALLS',
                      },
                      {
                        id: '0102010405',
                        description: 'Зорові зали',
                        value: 'THEY_STARED',
                      },
                      {
                        id: '0102010406',
                        description: 'Фойє кінотеатрів, клубів',
                        value: 'CINEMA_FOYER',
                      },
                      {
                        id: '0102010407',
                        description: 'Кімнати гуртків, музичні класи',
                        value: 'CIRCLE_ROOMS_AND_MUSIC_CLASSES',
                      },
                      {
                        id: '0102010408',
                        description: 'Кіно-, звуко- та світлоапаратні',
                        value: 'CINEMA-SOUND-LIGHT-HARDWARE',
                      },
                    ],
                  },
                  {
                    id: '0102010500',
                    description: 'Дитячі дошкільні заклади',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0102010501',
                        description: 'Приймальні',
                        value: 'RECEPTION_ROOMS',
                      },
                      {
                        id: '0102010502',
                        description: 'Роздягальні',
                        value: 'LOCKER_ROOMS',
                      },
                      {
                        id: '0102010503',
                        description: 'Групові, ігрові, їдальні, кімнати музичних і гімнастичних занять',
                        value: 'GROUP',
                      },
                      {
                        id: '0102010504',
                        description: 'Спальні',
                        value: 'CHILDRENS_BEDROOMS',
                      },
                      {
                        id: '0102010505',
                        description: 'Ізолятори, кімнати для дітей, які захворіли',
                        value: 'INSULATORS',
                      },
                    ],
                  },
                  {
                    id: '0102010600',
                    description: 'Санаторії, будинки відпочинку',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0102010601',
                        description: 'Палати',
                        value: 'CHAMBERS',
                      },
                      {
                        id: '0102010602',
                        description: 'Спальні кімнати',
                        value: 'SANATORIUMS_BEDROOMS',
                      },
                    ],
                  },
                  {
                    id: '0102010700',
                    description: 'Фізкультурно-оздоровчі установи',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0102010701',
                        description: 'Зали спортивних ігор',
                        value: 'SPORTS_HALLS',
                      },
                      {
                        id: '0102010702',
                        description: 'Спальні кімнати',
                        value: 'SPORTS_BEDROOMS',
                      },
                    ],
                  },
                  {
                    id: '0102010800',
                    description: 'Підприємства громадського харчування',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0102010801',
                        description: 'Обідні зали ресторанів, їдалень',
                        value: 'DINING_HALLS_OF_RESTAURANTS',
                      },
                      {
                        id: '0102010802',
                        description: 'Роздавальні',
                        value: 'DISPENSING',
                      },
                      {
                        id: '0102010803',
                        description: 'Гарячі цехи, холодні цехи, доготівельні й заготівельні цехи',
                        value: 'WORKSHOPS',
                      },
                      {
                        id: '0102010804',
                        description:
                          'Мийні кухонного та столового посуду, приміщення для різання хліба, приміщення завідувача виробництвом',
                        value: 'WASHING_KITCHEN_AND_TABLEWARE',
                      },
                    ],
                  },
                  {
                    id: '0102010900',
                    description: 'Магазини',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0102010901',
                        description:
                          'Торговельні зали магазинів: книжкових, готового одягу, білизни, взуття, тканин, хутряних виробів, головних уборів, парфумерних, галантерейних, ювелірних, електро-, радіотоварів, продовольчих без самообслуговування',
                        value: 'SHOPPING_HALLS_OF_SHOPS',
                      },
                      {
                        id: '0102010902',
                        description: 'Торговельні зали продовольчих магазинів з самообслуговуванням',
                        value: 'SELF-SERVICE_GROCERY_STORES',
                      },
                      {
                        id: '0102010903',
                        description:
                          'Торговельні зали магазинів: посудних, меблевих, спортивних товарів, будматеріалів, електропобутових приладів, іграшок та канцелярських товарів',
                        value: 'SHOPPING_HALLS_OF_STORES',
                      },
                      {
                        id: '0102010904',
                        description: 'Примірочні кабіни',
                        value: 'FITTING_CABINS',
                      },
                      {
                        id: '0102010905',
                        description: 'Приміщення відділів замовлень, бюро обслуговуванням',
                        value: 'PREMISES_OF_ORDER_DEPARTMENTS',
                      },
                      {
                        id: '0102010906',
                        description: 'Приміщення головних кас',
                        value: 'PREMISES_OF_THE_MAIN_CASH_DESKS',
                      },
                    ],
                  },
                  {
                    id: '0102011000',
                    description: 'Готелі',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0102011001',
                        description: 'Бюро обслуговування',
                        value: 'SERVICE_DESK',
                      },
                      {
                        id: '0102011002',
                        description: 'Приміщення чергового обслуговуючого персоналу',
                        value: 'PREMISES_OF_THE_NEXT_SERVICE_PERSONNEL',
                      },
                      {
                        id: '0102011003',
                        description: 'Вітальні, номери',
                        value: 'LIVING_ROOMS_AND_ROOMS',
                      },
                    ],
                  },
                  {
                    id: '0102011100',
                    description: 'Житлові будинки, гуртожитки',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0102011101',
                        description: 'Житлові кімнати, вітальні, спальні',
                        value: 'LIVING_ROOMS',
                      },
                      {
                        id: '0102011102',
                        description: 'Кухні',
                        value: 'KITCHENS',
                      },
                      {
                        id: '0102011103',
                        description: 'Коридори, ванні, туалети',
                        value: 'BATHROOMS_AND_TOILETS',
                      },
                      {
                        id: '0102011104',
                        description: 'Загальнобудинкові приміщення',
                        value: 'COMMON_PREMISES',
                      },
                    ],
                  },
                  {
                    id: '0102011200',
                    description: 'Допоміжні будинки й приміщення',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0102011201',
                        description:
                          'Санітарно-побутові приміщення (умивальні, туалети, курильні, душові, гардеробні, приміщення для сушіння, обезпилювання і знешкодження одягу і взуття, приміщення для обігрівання працюючих)',
                        value: 'SANITARY_FACILITIES',
                      },
                      {
                        id: '0102011202',
                        description: 'Здоровпункти: очікувальні, реєстратура, кімнати чергового персоналу',
                        value: 'HEALTH_POINTS_WAITING_ROOMS_RECEPTION_ROOMS_FOR_DUTY_PERSONNEL',
                      },
                      {
                        id: '0102011203',
                        description: "Здоровпункти: кабінети лікарів, перев'язувальні",
                        value: 'HEALTH_CENTERS_DOCTORS_OFFICES_DRESSINGS',
                      },
                      {
                        id: '0102011204',
                        description: 'Здоровпункти: процедурні кабінети',
                        value: 'HEALTH_CENTERS_TREATMENT_ROOMS',
                      },
                    ],
                  },
                  {
                    id: '0102011300',
                    description: 'Інші приміщення виробничих, допоміжних і громадських будинків',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0102011301',
                        description:
                          'Вестибулі й гардеробні вуличного одягу у вузах, школах, театрах, клубах, гуртожитках, готелях і головних входах у великі промислові підприємства та громадські будинки',
                        value: 'LOBBY_AND_DRESSING_ROOMS_OF_STREET_CLOTHES',
                      },
                      {
                        id: '0102011302',
                        description: 'Сходи: головні сходові клітки громадських, виробничих та допоміжних будинків',
                        value: 'STAIRS_MAIN_STAIRWELLS',
                      },
                      {
                        id: '0102011303',
                        description: 'Сходи: інші сходові клітки',
                        value: 'STAIRS_OTHER_STAIRWELLS',
                      },
                      {
                        id: '0102011304',
                        description: 'Ліфтові холи в громадських, виробничих і допоміжних будинках',
                        value: 'ELEVATOR_HALLS',
                      },
                      {
                        id: '0102011305',
                        description: 'Коридори й проходи: головні коридори й проходи',
                        value: 'CORRIDORS_AND_PASSAGES_MAIN_CORRIDORS_AND_PASSAGES',
                      },
                      {
                        id: '0102011306',
                        description: 'Коридори й проходи: поверхові коридори житлових будинків, інші коридори',
                        value: 'CORRIDORS_AND_PASSAGES_FLOOR_CORRIDORS_OF_APARTMENT_HOUSES',
                      },
                      {
                        id: '0102011307',
                        description: 'Машинні відділення ліфтів та приміщення для фреонових установок',
                        value: 'MACHINE_DEPARTMENTS_OF_ELEVATORS_AND_ROOMS_FOR_FREON_INSTALLATIONS',
                      },
                      {
                        id: '0102011308',
                        description: 'Горища',
                        value: 'ATTICS',
                      },
                    ],
                  },
                ],
              },
            },
            {
              id: '0102020000',
              title: 'Площа приміщення',
              dataType: 'number',
              unit: {
                scheme: 'UNCEFACT',
                id: '63',
                name: 'кв.м',
              },
            },
            {
              id: '0102030000',
              title: 'Кількість світлоточок',
              dataType: 'integer',
              unit: {
                id: '',
                name: 'шт',
              },
            },
          ],
        },
        {
          id: '0103000000',
          description: 'Нестандартний проект з освітлення',
          requirements: [
            {
              id: '0103010000',
              title: 'Площа приміщення',
              dataType: 'number',
              unit: {
                scheme: 'UNCEFACT',
                id: '63',
                name: 'кв.м',
              },
            },
            {
              id: '0103020000',
              title: 'Необхідний рівень освітленісті',
              dataType: 'string',
              optionDetails: {
                optionGroups: [
                  {
                    id: '0103020100',
                    description: 'Вкажіть потрібний рівень освітленості приміщення',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0103020101',
                        description: 'Приглушений',
                        value: 'low',
                      },
                      {
                        id: '0103020102',
                        description: 'Звичайний',
                        value: 'regular',
                      },
                      {
                        id: '0103020103',
                        description: 'Високий',
                        value: 'high',
                      },
                      {
                        id: '0103020104',
                        description: 'Надвисокий',
                        value: 'intensive',
                      },
                    ],
                  },
                ],
              },
            },
            {
              id: '0103030000',
              title: 'Кількість світлоточок',
              dataType: 'integer',
              unit: {
                id: '',
                name: 'шт',
              },
            },
          ],
        },
      ],
    },
    {
      id: '0200000000',
      title: 'Тип цоколя і лампи',
      requirementGroups: [
        {
          id: '0201000000',
          description: '2G11',
          requirements: [
            {
              id: '0201010000',
              title: 'Тип лампи',
              dataType: 'string',
              optionDetails: {
                optionGroups: [
                  {
                    id: '0201010100',
                    description: 'Вкажіть потрібний тип лампи',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0201010101',
                        description: 'Люмінісцентна лампа',
                        value: '31532900-3',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
        {
          id: '0202000000',
          description: '2G7',
          requirements: [
            {
              id: '0202010000',
              title: 'Тип лампи',
              dataType: 'string',
              optionDetails: {
                optionGroups: [
                  {
                    id: '0202010100',
                    description: 'Вкажіть потрібний тип лампи',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0202010101',
                        description: 'Люмінісцентна лампа',
                        value: '31532900-3',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
        {
          id: '0203000000',
          description: '2GX13',
          requirements: [
            {
              id: '0203010000',
              title: 'Тип лампи',
              dataType: 'string',
              optionDetails: {
                optionGroups: [
                  {
                    id: '0203010100',
                    description: 'Вкажіть потрібний тип лампи',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0203010101',
                        description: 'Галогенна лампа',
                        value: '31512000-8',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
        {
          id: '0204000000',
          description: 'E5',
          requirements: [
            {
              id: '0204010000',
              title: 'Тип лампи',
              dataType: 'string',
              optionDetails: {
                optionGroups: [
                  {
                    id: '0204010100',
                    description: 'Вкажіть потрібний тип лампи',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0204010101',
                        description: 'Лампа розжарення',
                        value: '31519100-8',
                      },
                      {
                        id: '0204010102',
                        description: 'Люмінісцентна лампа',
                        value: '31532900-3',
                      },
                      {
                        id: '0204010103',
                        description: 'Світлодіодна лампа',
                        value: '31712341-2',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
        {
          id: '0205000000',
          description: 'E10',
          requirements: [
            {
              id: '0205010000',
              title: 'Тип лампи',
              dataType: 'string',
              optionDetails: {
                optionGroups: [
                  {
                    id: '0205010100',
                    description: 'Вкажіть потрібний тип лампи',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0205010101',
                        description: 'Лампа розжарення',
                        value: '31519100-8',
                      },
                      {
                        id: '0205010102',
                        description: 'Люмінісцентна лампа',
                        value: '31532900-3',
                      },
                      {
                        id: '0205010103',
                        description: 'Світлодіодна лампа',
                        value: '31712341-2',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
        {
          id: '0206000000',
          description: 'E12',
          requirements: [
            {
              id: '0206010000',
              title: 'Тип лампи',
              dataType: 'string',
              optionDetails: {
                optionGroups: [
                  {
                    id: '0206010100',
                    description: 'Вкажіть потрібний тип лампи',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0206010101',
                        description: 'Лампа розжарення',
                        value: '31519100-8',
                      },
                      {
                        id: '0206010102',
                        description: 'Люмінісцентна лампа',
                        value: '31532900-3',
                      },
                      {
                        id: '0206010103',
                        description: 'Світлодіодна лампа',
                        value: '31712341-2',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
        {
          id: '0207000000',
          description: 'E14',
          requirements: [
            {
              id: '0207010000',
              title: 'Тип лампи',
              dataType: 'string',
              optionDetails: {
                optionGroups: [
                  {
                    id: '0207010100',
                    description: 'Вкажіть потрібний тип лампи',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0207010101',
                        description: 'Лампа розжарення',
                        value: '31519100-8',
                      },
                      {
                        id: '0207010102',
                        description: 'Галогенна лампа',
                        value: '31512000-8',
                      },
                      {
                        id: '0207010103',
                        description: 'Люмінісцентна лампа',
                        value: '31532900-3',
                      },
                      {
                        id: '0207010104',
                        description: 'Світлодіодна лампа',
                        value: '31712341-2',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
        {
          id: '0208000000',
          description: 'E27',
          requirements: [
            {
              id: '0208010000',
              title: 'Тип лампи',
              dataType: 'string',
              optionDetails: {
                optionGroups: [
                  {
                    id: '0208010100',
                    description: 'Вкажіть потрібний тип лампи',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0208010101',
                        description: 'Лампа розжарення',
                        value: '31519100-8',
                      },
                      {
                        id: '0208010102',
                        description: 'Галогенна лампа',
                        value: '31512000-8',
                      },
                      {
                        id: '0208010103',
                        description: 'Люмінісцентна лампа',
                        value: '31532900-3',
                      },
                      {
                        id: '0208010104',
                        description: 'Світлодіодна лампа',
                        value: '31712341-2',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
        {
          id: '0209000000',
          description: 'E40',
          requirements: [
            {
              id: '0209010000',
              title: 'Тип лампи',
              dataType: 'string',
              optionDetails: {
                optionGroups: [
                  {
                    id: '0209010100',
                    description: 'Вкажіть потрібний тип лампи',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0209010101',
                        description: 'Лампа розжарення',
                        value: '31519100-8',
                      },
                      {
                        id: '0209010102',
                        description: 'Люмінісцентна лампа',
                        value: '31532900-3',
                      },
                      {
                        id: '0209010103',
                        description: 'Світлодіодна лампа',
                        value: '31712341-2',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
        {
          id: '0210000000',
          description: 'Fa4',
          requirements: [
            {
              id: '0210010000',
              title: 'Тип лампи',
              dataType: 'string',
              optionDetails: {
                optionGroups: [
                  {
                    id: '0210010100',
                    description: 'Вкажіть потрібний тип лампи',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0210010101',
                        description: 'Галогенна лампа',
                        value: '31512000-8',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
        {
          id: '0211000000',
          description: 'G24d-1',
          requirements: [
            {
              id: '0211010000',
              title: 'Тип лампи',
              dataType: 'string',
              optionDetails: {
                optionGroups: [
                  {
                    id: '0211010100',
                    description: 'Вкажіть потрібний тип лампи',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0211010101',
                        description: 'Люмінісцентна лампа',
                        value: '31532900-3',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
        {
          id: '0212000000',
          description: 'G24d-2',
          requirements: [
            {
              id: '0212010000',
              title: 'Тип лампи',
              dataType: 'string',
              optionDetails: {
                optionGroups: [
                  {
                    id: '0212010100',
                    description: 'Вкажіть потрібний тип лампи',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0212010101',
                        description: 'Люмінісцентна лампа',
                        value: '31532900-3',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
        {
          id: '0213000000',
          description: 'G24d-3',
          requirements: [
            {
              id: '0213010000',
              title: 'Тип лампи',
              dataType: 'string',
              optionDetails: {
                optionGroups: [
                  {
                    id: '0213010100',
                    description: 'Вкажіть потрібний тип лампи',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0213010101',
                        description: 'Люмінісцентна лампа',
                        value: '31532900-3',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
        {
          id: '0214000000',
          description: 'G24q-1',
          requirements: [
            {
              id: '0214010000',
              title: 'Тип лампи',
              dataType: 'string',
              optionDetails: {
                optionGroups: [
                  {
                    id: '0214010100',
                    description: 'Вкажіть потрібний тип лампи',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0214010101',
                        description: 'Люмінісцентна лампа',
                        value: '31532900-3',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
        {
          id: '0215000000',
          description: 'G24q-2',
          requirements: [
            {
              id: '0215010000',
              title: 'Тип лампи',
              dataType: 'string',
              optionDetails: {
                optionGroups: [
                  {
                    id: '0215010100',
                    description: 'Вкажіть потрібний тип лампи',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0215010101',
                        description: 'Люмінісцентна лампа',
                        value: '31532900-3',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
        {
          id: '0216000000',
          description: 'G24q-3',
          requirements: [
            {
              id: '0216010000',
              title: 'Тип лампи',
              dataType: 'string',
              optionDetails: {
                optionGroups: [
                  {
                    id: '0216010100',
                    description: 'Вкажіть потрібний тип лампи',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0216010101',
                        description: 'Люмінісцентна лампа',
                        value: '31532900-3',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
        {
          id: '0217000000',
          description: 'G4',
          requirements: [
            {
              id: '0217010000',
              title: 'Тип лампи',
              dataType: 'string',
              optionDetails: {
                optionGroups: [
                  {
                    id: '0217010100',
                    description: 'Вкажіть потрібний тип лампи',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0217010101',
                        description: 'Галогенна лампа',
                        value: '31512000-8',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
        {
          id: '0218000000',
          description: 'G5',
          requirements: [
            {
              id: '0218010000',
              title: 'Тип лампи',
              dataType: 'string',
              optionDetails: {
                optionGroups: [
                  {
                    id: '0218010100',
                    description: 'Вкажіть потрібний тип лампи',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0218010101',
                        description: 'Люмінісцентна лампа',
                        value: '31532900-3',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
        {
          id: '0219000000',
          description: 'G8.5',
          requirements: [
            {
              id: '0219010000',
              title: 'Тип лампи',
              dataType: 'string',
              optionDetails: {
                optionGroups: [
                  {
                    id: '0219010100',
                    description: 'Вкажіть потрібний тип лампи',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0219010101',
                        description: 'Галогенна лампа',
                        value: '31512000-8',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
        {
          id: '0220000000',
          description: 'G9',
          requirements: [
            {
              id: '0220010000',
              title: 'Тип лампи',
              dataType: 'string',
              optionDetails: {
                optionGroups: [
                  {
                    id: '0220010100',
                    description: 'Вкажіть потрібний тип лампи',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0220010101',
                        description: 'Галогенна лампа',
                        value: '31512000-8',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
        {
          id: '0221000000',
          description: 'G10',
          requirements: [
            {
              id: '0221010000',
              title: 'Тип лампи',
              dataType: 'string',
              optionDetails: {
                optionGroups: [
                  {
                    id: '0221010100',
                    description: 'Вкажіть потрібний тип лампи',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0221010101',
                        description: 'Галогенна лампа',
                        value: '31512000-8',
                      },
                      {
                        id: '0221010102',
                        description: 'Люмінісцентна лампа',
                        value: '31532900-3',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
        {
          id: '0222000000',
          description: 'G13',
          requirements: [
            {
              id: '0222010000',
              title: 'Тип лампи',
              dataType: 'string',
              optionDetails: {
                optionGroups: [
                  {
                    id: '0222010100',
                    description: 'Вкажіть потрібний тип лампи',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0222010101',
                        description: 'Люмінісцентна лампа',
                        value: '31532900-3',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
        {
          id: '0223000000',
          description: 'G27',
          requirements: [
            {
              id: '0223010000',
              title: 'Тип лампи',
              dataType: 'string',
              optionDetails: {
                optionGroups: [
                  {
                    id: '0223010100',
                    description: 'Вкажіть потрібний тип лампи',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0223010101',
                        description: 'Люмінісцентна лампа',
                        value: '31532900-3',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
        {
          id: '0224000000',
          description: 'GU4',
          requirements: [
            {
              id: '0224010000',
              title: 'Тип лампи',
              dataType: 'string',
              optionDetails: {
                optionGroups: [
                  {
                    id: '0224010100',
                    description: 'Вкажіть потрібний тип лампи',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0224010101',
                        description: 'Галогенна лампа',
                        value: '31512000-8',
                      },
                      {
                        id: '0224010102',
                        description: 'Світлодіодна лампа',
                        value: '31712341-2',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
        {
          id: '0225000000',
          description: 'GU5.3',
          requirements: [
            {
              id: '0225010000',
              title: 'Тип лампи',
              dataType: 'string',
              optionDetails: {
                optionGroups: [
                  {
                    id: '0225010100',
                    description: 'Вкажіть потрібний тип лампи',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0225010101',
                        description: 'Галогенна лампа',
                        value: '31512000-8',
                      },
                      {
                        id: '0225010102',
                        description: 'Світлодіодна лампа',
                        value: '31712341-2',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
        {
          id: '0226000000',
          description: 'GU6',
          requirements: [
            {
              id: '0226010000',
              title: 'Тип лампи',
              dataType: 'string',
              optionDetails: {
                optionGroups: [
                  {
                    id: '0226010100',
                    description: 'Вкажіть потрібний тип лампи',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0226010101',
                        description: 'Галогенна лампа',
                        value: '31512000-8',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
        {
          id: '0227000000',
          description: 'GU6.35',
          requirements: [
            {
              id: '0227010000',
              title: 'Тип лампи',
              dataType: 'string',
              optionDetails: {
                optionGroups: [
                  {
                    id: '0227010100',
                    description: 'Вкажіть потрібний тип лампи',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0227010101',
                        description: 'Галогенна лампа',
                        value: '31512000-8',
                      },
                      {
                        id: '0227010102',
                        description: 'Світлодіодна лампа',
                        value: '31712341-2',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
        {
          id: '0228000000',
          description: 'GU9',
          requirements: [
            {
              id: '0228010000',
              title: 'Тип лампи',
              dataType: 'string',
              optionDetails: {
                optionGroups: [
                  {
                    id: '0228010100',
                    description: 'Вкажіть потрібний тип лампи',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0228010101',
                        description: 'Галогенна лампа',
                        value: '31512000-8',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
        {
          id: '0229000000',
          description: 'GU10',
          requirements: [
            {
              id: '0229010000',
              title: 'Тип лампи',
              dataType: 'string',
              optionDetails: {
                optionGroups: [
                  {
                    id: '0229010100',
                    description: 'Вкажіть потрібний тип лампи',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0229010101',
                        description: 'Галогенна лампа',
                        value: '31512000-8',
                      },
                      {
                        id: '0229010102',
                        description: 'Світлодіодна лампа',
                        value: '31712341-2',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
        {
          id: '0230000000',
          description: 'GU13',
          requirements: [
            {
              id: '0230010000',
              title: 'Тип лампи',
              dataType: 'string',
              optionDetails: {
                optionGroups: [
                  {
                    id: '0230010100',
                    description: 'Вкажіть потрібний тип лампи',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0230010101',
                        description: 'Галогенна лампа',
                        value: '31512000-8',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
        {
          id: '0231000000',
          description: 'GU14',
          requirements: [
            {
              id: '0231010000',
              title: 'Тип лампи',
              dataType: 'string',
              optionDetails: {
                optionGroups: [
                  {
                    id: '0231010100',
                    description: 'Вкажіть потрібний тип лампи',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0231010101',
                        description: 'Галогенна лампа',
                        value: '31512000-8',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
        {
          id: '0232000000',
          description: 'GX24d-1',
          requirements: [
            {
              id: '0232010000',
              title: 'Тип лампи',
              dataType: 'string',
              optionDetails: {
                optionGroups: [
                  {
                    id: '0232010100',
                    description: 'Вкажіть потрібний тип лампи',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0232010101',
                        description: 'Люмінісцентна лампа',
                        value: '31532900-3',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
        {
          id: '0233000000',
          description: 'GX24d-2',
          requirements: [
            {
              id: '0233010000',
              title: 'Тип лампи',
              dataType: 'string',
              optionDetails: {
                optionGroups: [
                  {
                    id: '0233010100',
                    description: 'Вкажіть потрібний тип лампи',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0233010101',
                        description: 'Люмінісцентна лампа',
                        value: '31532900-3',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
        {
          id: '0234000000',
          description: 'GX24d-3',
          requirements: [
            {
              id: '0234010000',
              title: 'Тип лампи',
              dataType: 'string',
              optionDetails: {
                optionGroups: [
                  {
                    id: '0234010100',
                    description: 'Вкажіть потрібний тип лампи',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0234010101',
                        description: 'Люмінісцентна лампа',
                        value: '31532900-3',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
        {
          id: '0235000000',
          description: 'GX24q-1',
          requirements: [
            {
              id: '0235010000',
              title: 'Тип лампи',
              dataType: 'string',
              optionDetails: {
                optionGroups: [
                  {
                    id: '0235010100',
                    description: 'Вкажіть потрібний тип лампи',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0235010101',
                        description: 'Люмінісцентна лампа',
                        value: '31532900-3',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
        {
          id: '0236000000',
          description: 'GX24q-2',
          requirements: [
            {
              id: '0236010000',
              title: 'Тип лампи',
              dataType: 'string',
              optionDetails: {
                optionGroups: [
                  {
                    id: '0236010100',
                    description: 'Вкажіть потрібний тип лампи',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0236010101',
                        description: 'Люмінісцентна лампа',
                        value: '31532900-3',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
        {
          id: '0237000000',
          description: 'GX24q-3',
          requirements: [
            {
              id: '0237010000',
              title: 'Тип лампи',
              dataType: 'string',
              optionDetails: {
                optionGroups: [
                  {
                    id: '0237010100',
                    description: 'Вкажіть потрібний тип лампи',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0237010101',
                        description: 'Люмінісцентна лампа',
                        value: '31532900-3',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
        {
          id: '0238000000',
          description: 'GX5.3',
          requirements: [
            {
              id: '0238010000',
              title: 'Тип лампи',
              dataType: 'string',
              optionDetails: {
                optionGroups: [
                  {
                    id: '0238010100',
                    description: 'Вкажіть потрібний тип лампи',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0238010101',
                        description: 'Галогенна лампа',
                        value: '31512000-8',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
        {
          id: '0239000000',
          description: 'GX8.5',
          requirements: [
            {
              id: '0239010000',
              title: 'Тип лампи',
              dataType: 'string',
              optionDetails: {
                optionGroups: [
                  {
                    id: '0239010100',
                    description: 'Вкажіть потрібний тип лампи',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0239010101',
                        description: 'Галогенна лампа',
                        value: '31512000-8',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
        {
          id: '0240000000',
          description: 'GY6.35',
          requirements: [
            {
              id: '0240010000',
              title: 'Тип лампи',
              dataType: 'string',
              optionDetails: {
                optionGroups: [
                  {
                    id: '0240010100',
                    description: 'Вкажіть потрібний тип лампи',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0240010101',
                        description: 'Галогенна лампа',
                        value: '31512000-8',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
        {
          id: '0241000000',
          description: 'GZ10',
          requirements: [
            {
              id: '0241010000',
              title: 'Тип лампи',
              dataType: 'string',
              optionDetails: {
                optionGroups: [
                  {
                    id: '0241010100',
                    description: 'Вкажіть потрібний тип лампи',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0241010101',
                        description: 'Галогенна лампа',
                        value: '31512000-8',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
        {
          id: '0242000000',
          description: 'R7s',
          requirements: [
            {
              id: '0242010000',
              title: 'Тип лампи',
              dataType: 'string',
              optionDetails: {
                optionGroups: [
                  {
                    id: '0242010100',
                    description: 'Вкажіть потрібний тип лампи',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0242010101',
                        description: 'Галогенна лампа',
                        value: '31512000-8',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
        {
          id: '0243000000',
          description: 'Rx7s',
          requirements: [
            {
              id: '0243010000',
              title: 'Тип лампи',
              dataType: 'string',
              optionDetails: {
                optionGroups: [
                  {
                    id: '0243010100',
                    description: 'Вкажіть потрібний тип лампи',
                    relatesTo: 'value',
                    options: [
                      {
                        id: '0243010101',
                        description: 'Галогенна лампа',
                        value: '31512000-8',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
      ],
    },
    {
      id: '0300000000',
      title: 'Режим використання освітлення',
      description: 'Зазначте інформацію із викостовуваного режиму освітлення ',
      requirementGroups: [
        {
          id: '0301000000',
          requirements: [
            {
              id: '0301010000',
              title: 'Кількість робочих годин на день',
              dataType: 'number',
              unit: {
                id: '',
                name: 'год/день',
              },
            },
            {
              id: '0301020000',
              title: 'Кількість робочих днів на тиждень',
              dataType: 'number',
              unit: {
                id: '',
                name: 'днів/тиждень',
              },
            },
          ],
        },
        {
          id: '0302000000',
          description: 'Інформація відсутня',
          requirements: [
            {
              id: '0302010000',
              title: 'Інформація відсутня',
              dataType: 'boolean',
              expectedValue: true,
            },
          ],
        },
      ],
    },
    {
      id: '0400000000',
      title: 'Тарифікація',
      description: 'Зазначте застосовуваний тариф на електроенергію',
      requirementGroups: [
        {
          id: '0401000000',
          requirements: [
            {
              id: '0401010000',
              title: 'Вартість електроенергії',
              dataType: 'number',
              unit: {
                id: '',
                name: 'грн',
              },
            },
          ],
        },
        {
          id: '0402000000',
          description: 'Інформація відсутня',
          requirements: [
            {
              id: '0402010000',
              title: 'Інформація відсутня',
              dataType: 'boolean',
              expectedValue: true,
            },
          ],
        },
      ],
    },
  ],
  conversions: [
    {
      id: '0100',
      relatesTo: 'requirement',
      relatedItem: '0102010000',
      description: 'Нормована освітленість, lux (lx)',
      coefficients: [
        {
          id: '0100',
          coefficient: 300,
          value: 'OFFICES_AND_STUDY_ROOMS',
        },
        {
          id: '0101',
          coefficient: 500,
          value: 'DESIGN_HALLS_AND_ROOMS_DESIGN_DRAWING_BUREAUS',
        },
        {
          id: '0102',
          coefficient: 75,
          value: 'BOOKSTORES_AND_ARCHIVES',
        },
        {
          id: '0103',
          coefficient: 300,
          value: 'REPAIR_SHOPS',
        },
        {
          id: '0104',
          coefficient: 300,
          value: 'ROOM_FOR_WORKING_WITH_DISPLAYS',
        },
        {
          id: '0105',
          coefficient: 300,
          value: 'CONFERENCE_HALLS',
        },
        {
          id: '0106',
          coefficient: 400,
          value: 'READING_ROOMS',
        },
        {
          id: '0107',
          coefficient: 150,
          value: 'LOBBY',
        },
        {
          id: '0108',
          coefficient: 400,
          value: 'LABORATORIES',
        },
        {
          id: '0109',
          coefficient: 500,
          value: 'ANALYTICAL_LABORATORIES',
        },
        {
          id: '0110',
          coefficient: 400,
          value: 'OPERATING_ROOM',
        },
        {
          id: '0111',
          coefficient: 400,
          value: 'PREMISES_FOR_MONEY_TRANSFER',
        },
        {
          id: '0112',
          coefficient: 450,
          value: 'CLASSROOMS',
        },
        {
          id: '0113',
          coefficient: 400,
          value: 'CLASSROOMS_CLASSROOMS',
        },
        {
          id: '0114',
          coefficient: 300,
          value: 'COMPUTER_SCIENCE_CLASSROOMS',
        },
        {
          id: '0115',
          coefficient: 500,
          value: 'CABINETS_OF_TECHNICAL_DRAWING',
        },
        {
          id: '0116',
          coefficient: 300,
          value: 'WORKROOMS',
        },
        {
          id: '0117',
          coefficient: 400,
          value: 'OFFICES_OF_SERVICE_TYPES_OF_WORK_FOR_GIRLS',
        },
        {
          id: '0118',
          coefficient: 200,
          value: 'GYMS',
        },
        {
          id: '0119',
          coefficient: 150,
          value: 'INDOOR_POOLS',
        },
        {
          id: '0120',
          coefficient: 200,
          value: 'ACTUALS_AND_MOVIE_AUDIENCES',
        },
        {
          id: '0121',
          coefficient: 300,
          value: 'VARIETY_OF_ASSEMBLY_HALLS',
        },
        {
          id: '0122',
          coefficient: 300,
          value: 'TEACHERS_OFFICES_AND_ROOMS',
        },
        {
          id: '0123',
          coefficient: 150,
          value: 'RECREATION',
        },
        {
          id: '0124',
          coefficient: 400,
          value: 'MULTIPURPOSE_HALLS',
        },
        {
          id: '0125',
          coefficient: 300,
          value: 'THEATER_AUDITORIUMS',
        },
        {
          id: '0126',
          coefficient: 200,
          value: 'HALLS_FOR_SPECTATORS_OF_CLUBS',
        },
        {
          id: '0127',
          coefficient: 2000,
          value: 'EXHIBITION_HALLS',
        },
        {
          id: '0128',
          coefficient: 75,
          value: 'THEY_STARED',
        },
        {
          id: '0129',
          coefficient: 150,
          value: 'CINEMA_FOYER',
        },
        {
          id: '0130',
          coefficient: 300,
          value: 'CIRCLE_ROOMS_AND_MUSIC_CLASSES',
        },
        {
          id: '0131',
          coefficient: 150,
          value: 'CINEMA-SOUND-LIGHT-HARDWARE',
        },
        {
          id: '0132',
          coefficient: 200,
          value: 'RECEPTION_ROOMS',
        },
        {
          id: '0133',
          coefficient: 200,
          value: 'LOCKER_ROOMS',
        },
        {
          id: '0134',
          coefficient: 400,
          value: 'GROUP',
        },
        {
          id: '0135',
          coefficient: 150,
          value: 'CHILDRENS_BEDROOMS',
        },
        {
          id: '0136',
          coefficient: 200,
          value: 'INSULATORS',
        },
        {
          id: '0137',
          coefficient: 100,
          value: 'CHAMBERS',
        },
        {
          id: '0138',
          coefficient: 100,
          value: 'SANATORIUM_BEDROOMS',
        },
        {
          id: '0139',
          coefficient: 200,
          value: 'SPORTS_HALLS',
        },
        {
          id: '0140',
          coefficient: 150,
          value: 'SPORTS_BEDROOMS',
        },
        {
          id: '0141',
          coefficient: 200,
          value: 'DINING_HALLS_OF_RESTAURANTS',
        },
        {
          id: '0142',
          coefficient: 300,
          value: 'DISPENSING',
        },
        {
          id: '0143',
          coefficient: 200,
          value: 'WORKSHOPS',
        },
        {
          id: '0144',
          coefficient: 200,
          value: 'WASHING_KITCHEN_AND_TABLEWARE',
        },
        {
          id: '0145',
          coefficient: 300,
          value: 'SHOPPING_HALLS_OF_SHOPS',
        },
        {
          id: '0146',
          coefficient: 400,
          value: 'SELF-SERVICE_GROCERY_STORES',
        },
        {
          id: '0147',
          coefficient: 200,
          value: 'SHOPPING_HALLS_OF_STORES',
        },
        {
          id: '0148',
          coefficient: 300,
          value: 'FITTING_CABINS',
        },
        {
          id: '0149',
          coefficient: 200,
          value: 'PREMISES_OF_ORDER_DEPARTMENTS',
        },
        {
          id: '0150',
          coefficient: 300,
          value: 'PREMISES_OF_THE_MAIN_CASH_DESKS',
        },
        {
          id: '0151',
          coefficient: 200,
          value: 'SERVICE_DESK',
        },
        {
          id: '0152',
          coefficient: 200,
          value: 'PREMISES_OF_THE_NEXT_SERVICE_PERSONNEL',
        },
        {
          id: '0153',
          coefficient: 150,
          value: 'LIVING_ROOMS_AND_ROOMS',
        },
        {
          id: '0154',
          coefficient: 150,
          value: 'LIVING_ROOMS',
        },
        {
          id: '0155',
          coefficient: 150,
          value: 'KITCHENS',
        },
        {
          id: '0156',
          coefficient: 150,
          value: 'BATHROOMS_AND_TOILETS',
        },
        {
          id: '0157',
          coefficient: 25,
          value: 'COMMON_PREMISES',
        },
        {
          id: '0158',
          coefficient: 75,
          value: 'SANITARY_FACILITIES',
        },
        {
          id: '0159',
          coefficient: 200,
          value: 'HEALTH_POINTS_WAITING_ROOMS_RECEPTION_ROOMS_FOR_DUTY_PERSONNEL',
        },
        {
          id: '0160',
          coefficient: 300,
          value: 'HEALTH_CENTERS_DOCTORS_OFFICES_DRESSINGS',
        },
        {
          id: '0161',
          coefficient: 500,
          value: 'HEALTH_CENTERS_TREATMENT_ROOMS',
        },
        {
          id: '0162',
          coefficient: 150,
          value: 'LOBBY_AND_DRESSING_ROOMS_OF_STREET_CLOTHES',
        },
        {
          id: '0163',
          coefficient: 100,
          value: 'STAIRS_MAIN_STAIRWELLS',
        },
        {
          id: '0164',
          coefficient: 50,
          value: 'STAIRS_OTHER_STAIRWELLS',
        },
        {
          id: '0165',
          coefficient: 75,
          value: 'ELEVATOR_HALLS',
        },
        {
          id: '0166',
          coefficient: 75,
          value: 'CORRIDORS_AND_PASSAGES_MAIN_CORRIDORS_AND_PASSAGES',
        },
        {
          id: '0167',
          coefficient: 50,
          value: 'CORRIDORS_AND_PASSAGES_FLOOR_CORRIDORS_OF_APARTMENT_HOUSES',
        },
        {
          id: '0168',
          coefficient: 30,
          value: 'MACHINE_DEPARTMENTS_OF_ELEVATORS_AND_ROOMS_FOR_FREON_INSTALLATIONS',
        },
        {
          id: '0169',
          coefficient: 10,
          value: 'ATTICS',
        },
      ],
    },
    {
      id: '0200',
      relatesTo: 'requirement',
      relatedItem: '0201020000',
      description: 'Світлова ефективність, лм/Вт (lm/W)',
      coefficients: [
        {
          id: '0201',
          coefficient: 15,
          value: '31519100-8',
        },
        {
          id: '0202',
          coefficient: 20,
          value: '31512000-8',
        },
        {
          id: '0203',
          coefficient: 60,
          value: '31532900-3',
        },
        {
          id: '0204',
          coefficient: 90,
          value: '31712341-2',
        },
      ],
    },
    {
      id: '0300',
      relatesTo: 'requirement',
      relatedItem: '0103020000',
      description: 'Рівні нормованої освітленості, lux (lx)',
      coefficients: [
        {
          id: '0301',
          coefficient: 50,
          value: 'low',
        },
        {
          id: '0302',
          coefficient: 100,
          value: 'regular',
        },
        {
          id: '0303',
          coefficient: 300,
          value: 'high',
        },
        {
          id: '0304',
          coefficient: 750,
          value: 'intensive',
        },
      ],
    },
    {
      id: '0400',
      relatesTo: 'requirement',
      relatedItem: '0201020000',
      description: 'Середній життєвий цикл, год (hours)',
      coefficients: [
        {
          id: '0401',
          coefficient: 1375,
          value: '31519100-8',
        },
        {
          id: '0402',
          coefficient: 3000,
          value: '31512000-8',
        },
        {
          id: '0403',
          coefficient: 30000,
          value: '31532900-3',
        },
        {
          id: '0404',
          coefficient: 42500,
          value: '31712341-2',
        },
      ],
    },
  ],
};
const specificBulbBody = {
  requestedNeed: {
    id: '01fc98b0-57b8-4ce6-8588-8d88427f1096',
    requirementResponses: [
      { id: '31874cbb-a823-4cf5-83aa-a4b50ecd221b', value: 56, requirement: { id: '0101010000' } },
      { id: '7c6bf21a-c40e-439e-bace-2ee3dbb0efb7', value: 10, requirement: { id: '0101020000' } },
      { id: 'ec4669e2-df44-4ec7-b65d-09ea5b622ed6', value: '31519100-8', requirement: { id: '0208010000' } },
      { id: '208ca34f-031f-4c80-9680-93304726cb6c', value: 8, requirement: { id: '0301010000' } },
      { id: '1fe732a1-3cb1-40d6-b10a-567e960e05cd', value: 5, requirement: { id: '0301020000' } },
      { id: '1c673cee-2c47-4aa9-beec-5fa515aae4ca', value: 1.4, requirement: { id: '0401010000' } },
    ],
  },
};
const specificBulbResponse = {
  category: '31500000-1',
  version: 'v6',
  availableVariants: [
    {
      id: expect.any(String),
      relatedItem: '31519100-8',
      quantity: 10,
      metrics: [
        {
          id: '0100',
          title: 'Технічні показники',
          observations: [
            { id: '0101', notes: 'Потужність', measure: 60, unit: { id: '345', name: 'Вт' } },
            { id: '0102', notes: 'Термін експлуатації', measure: 1375, unit: { id: '155', name: 'год' } },
          ],
        },
        {
          id: '0200',
          title: 'Показники енергоефективності',
          observations: [
            { id: '0201', notes: 'Індекс енергоефективності', measure: 1.86 },
            { id: 'energyEfficiencyClass', notes: 'Клас енергоефективності', measure: 'E' },
          ],
        },
      ],
      avgValue: { amount: 0, currency: 'UAH' },
      relatedProducts: ['https://prozorro.gov.ua/ProzorroMarket'],
      criteria: [
        {
          id: '0100000000',
          title: 'Додаткова інформація',
          description: 'Оберіть варіант освітлення',
          requirementGroups: [
            {
              id: '0101000000',
              requirements: [
                { id: '0101010000', title: 'Спрямоване освітлення', dataType: 'boolean', expectedValue: true },
              ],
            },
            {
              id: '0102000000',
              requirements: [
                { id: '0102010000', title: 'Розсіяне освітлення', dataType: 'boolean', expectedValue: true },
              ],
            },
          ],
        },
      ],
    },
    {
      id: expect.any(String),
      relatedItem: '31532900-3',
      quantity: 10,
      metrics: [
        {
          id: '0100',
          title: 'Технічні показники',
          observations: [
            { id: '0101', notes: 'Потужність', measure: 30, unit: { id: '345', name: 'Вт' } },
            { id: '0102', notes: 'Термін експлуатації', measure: 30000, unit: { id: '155', name: 'год' } },
          ],
        },
        {
          id: '0200',
          title: 'Показники енергоефективності',
          observations: [
            { id: '0201', notes: 'Індекс енергоефективності', measure: 0.23 },
            { id: 'energyEfficiencyClass', notes: 'Клас енергоефективності', measure: 'A' },
          ],
        },
        {
          id: '0300',
          title: 'Економічні показники',
          observations: [
            { id: 'serviceLife', notes: 'Термін служби', measure: '21.8' },
            { id: 'energyEconomy', notes: 'Менше енергії', measure: '624', unit: { id: '332', name: 'кВт*год/рік' } },
            { id: 'financeEconomy', notes: 'Фінансової економії', value: { amount: 874, currency: 'грн/рік' } },
          ],
        },
      ],
      avgValue: { amount: 0, currency: 'UAH' },
      relatedProducts: ['https://prozorro.gov.ua/ProzorroMarket'],
      criteria: [
        {
          id: '0100000000',
          title: 'Додаткова інформація',
          description: 'Оберіть варіант освітлення',
          requirementGroups: [
            {
              id: '0101000000',
              requirements: [
                { id: '0101010000', title: 'Спрямоване освітлення', dataType: 'boolean', expectedValue: true },
              ],
            },
            {
              id: '0102000000',
              requirements: [
                { id: '0102010000', title: 'Розсіяне освітлення', dataType: 'boolean', expectedValue: true },
              ],
            },
          ],
        },
      ],
    },
    {
      id: expect.any(String),
      relatedItem: '31712341-2',
      quantity: 10,
      metrics: [
        {
          id: '0100',
          title: 'Технічні показники',
          observations: [
            { id: '0101', notes: 'Потужність', measure: 10, unit: { id: '345', name: 'Вт' } },
            { id: '0102', notes: 'Термін експлуатації', measure: 42000, unit: { id: '155', name: 'год' } },
          ],
        },
        {
          id: '0200',
          title: 'Показники енергоефективності',
          observations: [
            { id: '0201', notes: 'Індекс енергоефективності', measure: 0.31 },
            { id: 'energyEfficiencyClass', notes: 'Клас енергоефективності', measure: 'A' },
          ],
        },
        {
          id: '0300',
          title: 'Економічні показники',
          observations: [
            { id: 'serviceLife', notes: 'Термін служби', measure: '30.5' },
            { id: 'energyEconomy', notes: 'Менше енергії', measure: '1040', unit: { id: '332', name: 'кВт*год/рік' } },
            { id: 'financeEconomy', notes: 'Фінансової економії', value: { amount: 1456, currency: 'грн/рік' } },
          ],
        },
      ],
      avgValue: { amount: 0, currency: 'UAH' },
      relatedProducts: ['https://prozorro.gov.ua/ProzorroMarket'],
      criteria: [
        {
          id: '0100000000',
          title: 'Додаткова інформація',
          description: 'Оберіть варіант освітлення',
          requirementGroups: [
            {
              id: '0101000000',
              requirements: [
                { id: '0101010000', title: 'Спрямоване освітлення', dataType: 'boolean', expectedValue: true },
              ],
            },
            {
              id: '0102000000',
              requirements: [
                { id: '0102010000', title: 'Розсіяне освітлення', dataType: 'boolean', expectedValue: true },
              ],
            },
          ],
        },
      ],
    },
    {
      id: expect.any(String),
      relatedItem: '31512000-8',
      quantity: 10,
      metrics: [
        {
          id: '0100',
          title: 'Технічні показники',
          observations: [
            { id: '0101', notes: 'Потужність', measure: 45, unit: { id: '345', name: 'Вт' } },
            { id: '0102', notes: 'Термін експлуатації', measure: 3000, unit: { id: '155', name: 'год' } },
          ],
        },
        {
          id: '0200',
          title: 'Показники енергоефективності',
          observations: [
            { id: '0201', notes: 'Індекс енергоефективності', measure: 1.4 },
            { id: 'energyEfficiencyClass', notes: 'Клас енергоефективності', measure: 'D' },
          ],
        },
        {
          id: '0300',
          title: 'Економічні показники',
          observations: [
            { id: 'serviceLife', notes: 'Термін служби', measure: '2.2' },
            { id: 'energyEconomy', notes: 'Менше енергії', measure: '312', unit: { id: '332', name: 'кВт*год/рік' } },
            { id: 'financeEconomy', notes: 'Фінансової економії', value: { amount: 437, currency: 'грн/рік' } },
          ],
        },
      ],
      avgValue: { amount: 0, currency: 'UAH' },
      relatedProducts: ['https://prozorro.gov.ua/ProzorroMarket'],
      criteria: [
        {
          id: '0100000000',
          title: 'Додаткова інформація',
          description: 'Оберіть варіант освітлення',
          requirementGroups: [
            {
              id: '0101000000',
              requirements: [
                { id: '0101010000', title: 'Спрямоване освітлення', dataType: 'boolean', expectedValue: true },
              ],
            },
            {
              id: '0102000000',
              requirements: [
                { id: '0102010000', title: 'Розсіяне освітлення', dataType: 'boolean', expectedValue: true },
              ],
            },
          ],
        },
      ],
    },
  ],
};

test('Test specific bulb case', () => {
  // @ts-ignore @TODO need fix types in ts4ocds dataType in requirement
  expect(algorithm({ category, version: 'v6', requestedNeed: specificBulbBody.requestedNeed })).toEqual(
    specificBulbResponse
  );
});
