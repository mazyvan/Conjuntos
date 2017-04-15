import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NumOfRows } from "./app.component";
import { NumberToLetter } from "./app.component";
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    NumOfRows,
    NumberToLetter
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

declare global {
  interface Set<T> {
    /**
     * Checks if the set contains each element of the second set sended as a parameter.
     */
    isSuperset(setB: Set<any>): boolean;
    /**
     * Returns the union of A and B, denoted by A ∪ B, is the set of all things that are 
     * members of either A or B.
     */
    union(setB: Set<any> | Set<any>[]): Set<any>;
    /**
     * Returns the intersection of A and B, denoted by A ∩ B, is the set of all things 
     * that are members of both A and B. If A ∩ B = ∅, then A and B are said to be disjoint.
     */
    intersection(setB: Set<any>): Set<any>;
    /**
     * Returns the relative complement of B in A (also called the set-theoretic difference 
     * of A and B), denoted by A \ B (or A − B), is the set of all elements that are members 
     * of A but not members of B.
     */
    difference(setB: Set<any>): Set<any>;
    /**
     * Returns the Cartesian product of two sets A and B, denoted by A × B is the set of all 
     * ordered pairs (a, b) such that a is a member of A and b is a member of B.
     */
    cartesianProduct(setB: Set<any>): Set<any>;
    /**
     * Returns the JavaScript Array with all the elements in the Set.
     */
    toArray(): T[];
  }
}