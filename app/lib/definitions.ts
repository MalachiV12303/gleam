
export type CameraType = {
  id: string;
  name: string;
  type: string;
  brand: string;
  value: number;
  megapixels: number;
};

export type CameraDetail = {
  name: string;
  type: string;
  brand: string;
  value: number;
  megapixels: number;
};

export type LenseType = {
  id: string;
  name: string;
  type: string;
  brand: string;
  value: number;
  megapixels: number;
};
export type AerialType = {
  id: string;
  name: string;
  type: string;
  brand: string;
  value: number;
  megapixels: number;
};

export type CameraTableType = {
  id: string;
  name: string;
  brand: string;
  price: number;
}

export type Filter = {
  type: 'camera' | 'lense' | 'aerial' | 'access';
  value: string;
};
