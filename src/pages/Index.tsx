import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [selectedClass, setSelectedClass] = useState('all');

  const cars = [
    {
      id: 1,
      name: 'Toyota Camry',
      class: 'comfort',
      image: '/img/bde18a90-788e-48c5-9c8a-c13695e3252e.jpg',
      price: 2500,
      features: ['Автомат', 'Кондиционер', 'GPS'],
      specs: { year: 2022, engine: '2.0L', fuel: 'Бензин' },
      discount: 10
    },
    {
      id: 2,
      name: 'BMW X5',
      class: 'premium',
      image: '/img/c84033fe-6be7-4b5e-aea2-f4bbf9fe4396.jpg',
      price: 4500,
      features: ['Автомат', 'Кожа', 'Климат-контроль', 'Панорама'],
      specs: { year: 2023, engine: '3.0L', fuel: 'Бензин' },
      discount: 15
    },
    {
      id: 3,
      name: 'Porsche 911',
      class: 'sport',
      image: '/img/4ae1dc1a-2840-4342-8716-fb86265bd912.jpg',
      price: 8500,
      features: ['Механика', 'Спорт-пакет', 'Bose аудио'],
      specs: { year: 2023, engine: '3.8L', fuel: 'Бензин' },
      discount: 0
    }
  ];

  const classes = [
    { id: 'all', name: 'Все классы', icon: 'Car' },
    { id: 'comfort', name: 'Комфорт', icon: 'Shield' },
    { id: 'premium', name: 'Премиум', icon: 'Star' },
    { id: 'sport', name: 'Спорт', icon: 'Zap' }
  ];

  const filteredCars = selectedClass === 'all' ? cars : cars.filter(car => car.class === selectedClass);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-black text-white py-4 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Icon name="Car" size={32} className="text-primary" />
            <h1 className="text-2xl font-bold">RentCar Магадан</h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Icon name="Phone" size={18} />
              <span>+7 (413) 60-XX-XX</span>
            </div>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
              Заказать звонок
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">Автопрокат в Магадане</h2>
          <p className="text-xl mb-8 opacity-90">Широкий выбор автомобилей для любых целей</p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
              <Icon name="Calendar" size={20} className="mr-2" />
              Забронировать
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <Icon name="Phone" size={20} className="mr-2" />
              Связаться
            </Button>
          </div>
        </div>
      </section>

      {/* Car Classes Filter */}
      <section className="py-8 px-4 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center gap-4 flex-wrap">
            {classes.map((carClass) => (
              <Button
                key={carClass.id}
                variant={selectedClass === carClass.id ? "default" : "outline"}
                onClick={() => setSelectedClass(carClass.id)}
                className="flex items-center gap-2"
              >
                <Icon name={carClass.icon as any} size={18} />
                {carClass.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Car Catalog */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Каталог автомобилей</h3>
          
          {selectedClass === 'all' ? (
            // Show by classes
            <>
              {classes.filter(c => c.id !== 'all').map((carClass) => {
                const classCars = cars.filter(car => car.class === carClass.id);
                if (classCars.length === 0) return null;
                
                return (
                  <div key={carClass.id} className="mb-16">
                    <div className="flex items-center justify-center gap-3 mb-8">
                      <Icon name={carClass.icon as any} size={24} className="text-primary" />
                      <h4 className="text-2xl font-semibold">{carClass.name}</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {classCars.map((car) => (
                        <Card key={car.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                          <div className="relative">
                            <img 
                              src={car.image} 
                              alt={car.name}
                              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {car.discount > 0 && (
                              <Badge className="absolute top-4 right-4 bg-secondary">
                                -{car.discount}%
                              </Badge>
                            )}
                          </div>
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                              <h4 className="text-xl font-semibold">{car.name}</h4>
                              <Badge variant="outline" className="text-primary">
                                {classes.find(c => c.id === car.class)?.name}
                              </Badge>
                            </div>
                            
                            <div className="space-y-3 mb-6">
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span><Icon name="Calendar" size={16} className="inline mr-1" />{car.specs.year}</span>
                                <span><Icon name="Gauge" size={16} className="inline mr-1" />{car.specs.engine}</span>
                                <span><Icon name="Fuel" size={16} className="inline mr-1" />{car.specs.fuel}</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {car.features.map((feature, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {feature}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div className="flex justify-between items-center">
                              <div>
                                <div className="text-2xl font-bold text-primary">
                                  {car.discount > 0 ? (
                                    <>
                                      <span className="text-lg line-through text-gray-400 mr-2">
                                        {car.price} ₽
                                      </span>
                                      {Math.round(car.price * (1 - car.discount / 100))} ₽
                                    </>
                                  ) : (
                                    `${car.price} ₽`
                                  )}
                                </div>
                                <div className="text-sm text-gray-500">за сутки</div>
                              </div>
                              <Button className="bg-primary hover:bg-primary/90">
                                Арендовать
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            // Show filtered cars
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCars.map((car) => (
              <Card key={car.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative">
                  <img 
                    src={car.image} 
                    alt={car.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {car.discount > 0 && (
                    <Badge className="absolute top-4 right-4 bg-secondary">
                      -{car.discount}%
                    </Badge>
                  )}
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-xl font-semibold">{car.name}</h4>
                    <Badge variant="outline" className="text-primary">
                      {classes.find(c => c.id === car.class)?.name}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span><Icon name="Calendar" size={16} className="inline mr-1" />{car.specs.year}</span>
                      <span><Icon name="Gauge" size={16} className="inline mr-1" />{car.specs.engine}</span>
                      <span><Icon name="Fuel" size={16} className="inline mr-1" />{car.specs.fuel}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {car.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">
                        {car.discount > 0 ? (
                          <>
                            <span className="text-lg line-through text-gray-400 mr-2">
                              {car.price} ₽
                            </span>
                            {Math.round(car.price * (1 - car.discount / 100))} ₽
                          </>
                        ) : (
                          `${car.price} ₽`
                        )}
                      </div>
                      <div className="text-sm text-gray-500">за сутки</div>
                    </div>
                    <Button className="bg-primary hover:bg-primary/90">
                      Арендовать
                    </Button>
                  </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Conditions */}
      <section className="py-16 px-4 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Условия аренды</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: 'CreditCard', title: 'Оплата', desc: 'Наличными или картой' },
              { icon: 'Shield', title: 'Страховка', desc: 'КАСКО и ОСАГО включены' },
              { icon: 'Clock', title: 'Время', desc: 'Аренда от 1 дня' },
              { icon: 'MapPin', title: 'Доставка', desc: 'По городу бесплатно' }
            ].map((condition, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <Icon name={condition.icon as any} size={48} className="text-primary mx-auto mb-4" />
                <h4 className="font-semibold mb-2">{condition.title}</h4>
                <p className="text-gray-600 text-sm">{condition.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Discounts */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Скидки и акции</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 border-l-4 border-l-secondary">
              <Icon name="Percent" size={32} className="text-secondary mb-4" />
              <h4 className="font-semibold mb-2">Долгосрочная аренда</h4>
              <p className="text-gray-600 mb-4">От 7 дней - скидка 15%</p>
              <p className="text-secondary font-semibold">До -15%</p>
            </Card>
            <Card className="p-6 border-l-4 border-l-primary">
              <Icon name="Users" size={32} className="text-primary mb-4" />
              <h4 className="font-semibold mb-2">Постоянным клиентам</h4>
              <p className="text-gray-600 mb-4">Каждая 10-я аренда бесплатно</p>
              <p className="text-primary font-semibold">Бонусная программа</p>
            </Card>
            <Card className="p-6 border-l-4 border-l-black">
              <Icon name="Gift" size={32} className="text-black mb-4" />
              <h4 className="font-semibold mb-2">Первая аренда</h4>
              <p className="text-gray-600 mb-4">Скидка 10% новым клиентам</p>
              <p className="text-black font-semibold">Код: FIRST10</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Contacts */}
      <section className="py-16 px-4 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Контакты</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <Icon name="Phone" size={48} className="text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Телефон</h4>
              <p>+7 (413) 60-XX-XX</p>
              <p className="text-gray-400">Круглосуточно</p>
            </div>
            <div>
              <Icon name="MapPin" size={48} className="text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Адрес</h4>
              <p>г. Магадан</p>
              <p>ул. Ленина, 1</p>
            </div>
            <div>
              <Icon name="Mail" size={48} className="text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Email</h4>
              <p>info@rentcar-magadan.ru</p>
              <p className="text-gray-400">Ответим в течение часа</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Icon name="Car" size={24} className="text-primary" />
            <span className="font-semibold">RentCar Магадан</span>
          </div>
          <p className="text-gray-400">© 2024 RentCar. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;