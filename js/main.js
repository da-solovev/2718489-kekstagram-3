const PHOTO_DESCRIPTIONS = [
  'Закат над морем',
  'Горы в облаках',
  'Город ночью',
  'Лесная тропинка',
  'Кот на подоконнике',
  'Цветы в саду',
  'Снежные вершины',
  'Кофе и книга',
  'Пляж и пальмы',
  'Осенний парк'
];

const NAMES = [
  'Александр',
  'Мария',
  'Дмитрий',
  'Анна',
  'Сергей',
  'Екатерина',
  'Иван',
  'Ольга',
  'Михаил',
  'Наталья'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomElementFromArray = (arr) => arr[getRandomInteger(0, arr.length - 1)];

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return () => {
    let currentValues = getRandomInteger(min, max);
    if (previousValues.length >= max - min + 1) {
      console.error(`Перебраны все числа из диапозона от ${min} до ${max}`);
      return null;
    }
    while (previousValues.includes(currentValues)) {
      currentValues = getRandomInteger(min, max);
    }
    previousValues.push(currentValues);
    return currentValues;
  };
};

const generatePhotos = (countPhotos = 25, maxComments = 30) => {
  const generatorPhotoId = createRandomIdFromRangeGenerator(1, countPhotos);
  const generatorCommentId = createRandomIdFromRangeGenerator(1, countPhotos * maxComments);
  const generatorCommentCount = createRandomIdFromRangeGenerator(0, maxComments);

  const createComment = () => {
    const id = generatorCommentId();

    return {
      id,
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: getRandomElementFromArray(MESSAGES),
      name: getRandomElementFromArray(NAMES),
    };
  };

  const createPhoto = () => {
    const id = generatorPhotoId();

    return {
      id,
      url: `photos/${id}.jpg`,
      description: getRandomElementFromArray(PHOTO_DESCRIPTIONS),
      likes: getRandomInteger(15, 200),
      comments: Array.from({length: generatorCommentCount()}, createComment)
    };
  };

  return Array.from({length: countPhotos}, createPhoto);
};
