# program 7 fake

# program 7
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

# -------------------------
# Linear Regression
# -------------------------

housing = pd.read_csv('california_housing.csv')

X_housing = housing[['MedInc']]
y_housing = housing['MedHouseVal']

X_train, X_test, y_train, y_test = train_test_split(
    X_housing,
    y_housing,
    test_size=0.2,
    random_state=42
)

lin_reg = LinearRegression()
lin_reg.fit(X_train, y_train)

y_pred = lin_reg.predict(X_test)

plt.scatter(X_test, y_test,
            color='blue',
            label='Actual Data')

plt.plot(X_test, y_pred,
         color='red',
         label='Linear Regression')

plt.xlabel("Median Income (MedInc)")
plt.ylabel("House Price")
plt.title("Linear Regression on California Housing Dataset")
plt.legend()
plt.show()


# -------------------------
# Polynomial Regression (Fake)
# -------------------------

x = np.linspace(0,10,100)
y = x**2 + np.random.randn(100)*5

coef = np.polyfit(x, y, 2)
y_pred = np.polyval(coef, x)

plt.scatter(x, y,
            color='blue',
            label='Actual Data')

plt.plot(x, y_pred,
         color='red',
         label='Polynomial Regression')

plt.title("Polynomial Regression")
plt.legend()
plt.show()